import {MutableRefObject, useEffect, useRef} from "react";

import useLayoutEffect from "./useIsomorphicLayoutEffect";

type OptionsType = {
    decayRate?: number;
    safeDisplacement?: number;
    applyRubberBandEffect?: boolean;
    activeMouseButton?: "Left" | "Middle" | "Right";
    isMounted?: boolean;
};

type ReturnType = {
    events: {
        onMouseDown: (e: React.MouseEvent<HTMLElement>) => void;
    };
};

export function useDraggable(
    ref: MutableRefObject<HTMLElement>,
    {
        decayRate = 0.95,
        safeDisplacement = 10,
        applyRubberBandEffect = false,
        activeMouseButton = "Left",
        isMounted = true,
    }: OptionsType = {}
): ReturnType {
    const internalState = useRef({
        isMouseDown: false,
        isDraggingX: false,
        initialMouseX: 0,
        lastMouseX: 0,
        scrollSpeedX: 0,
        lastScrollX: 0,
    });

    let isScrollableAlongX = false;
    let maxHorizontalScroll = 0;
    let cursorStyleOfWrapperElement: string;
    let cursorStyleOfChildElements: string[];
    let transformStyleOfChildElements: string[];
    let transitionStyleOfChildElements: string[];

    const timing = (1 / 60) * 1000; // period of most monitors (60fps)

    useLayoutEffect(() => {
        if (isMounted) {
            isScrollableAlongX =
                window.getComputedStyle(ref.current).overflowX === "scroll";

            maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth;

            cursorStyleOfWrapperElement = window.getComputedStyle(ref.current).cursor;

            cursorStyleOfChildElements = [];
            transformStyleOfChildElements = [];
            transitionStyleOfChildElements = [];

            (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
                (child: HTMLElement) => {
                    cursorStyleOfChildElements.push(
                        window.getComputedStyle(child).cursor
                    );

                    transformStyleOfChildElements.push(
                        window.getComputedStyle(child).transform === "none"
                            ? ""
                            : window.getComputedStyle(child).transform
                    );

                    transitionStyleOfChildElements.push(
                        window.getComputedStyle(child).transition === "none"
                            ? ""
                            : window.getComputedStyle(child).transition
                    );
                }
            );
        }
    }, [isMounted]);

    const runScroll = () => {
        const dx = internalState.current.scrollSpeedX * timing;
        const offsetX = ref.current.scrollLeft + dx;

        ref.current.scrollLeft = offsetX; // eslint-disable-line no-param-reassign
        internalState.current.lastScrollX = offsetX;
    };

    const rubberBandCallback = (e: MouseEvent) => {
        const dx = e.clientX - internalState.current.initialMouseX;

        const {clientWidth} = ref.current;

        let displacementX = 0;
        let displacementY = 0;

        if (isScrollableAlongX) {
            displacementX =
                0.3 *
                clientWidth *
                Math.sign(dx) *
                Math.log10(1.0 + (0.5 * Math.abs(dx)) / clientWidth);
        }

        (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
            (child: HTMLElement) => {
                child.style.transform = `translate3d(${displacementX}px, ${displacementY}px, 0px)`; // eslint-disable-line no-param-reassign
                child.style.transition = "transform 0ms"; // eslint-disable-line no-param-reassign
            }
        );
    };

    const recoverChildStyle = () => {
        (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
            (child: HTMLElement, i) => {
                child.style.transform = transformStyleOfChildElements[i]; // eslint-disable-line no-param-reassign
                child.style.transition = transitionStyleOfChildElements[i]; // eslint-disable-line no-param-reassign
            }
        );
    };

    let rubberBandAnimationTimer: NodeJS.Timeout;
    let keepMovingX: NodeJS.Timer;

    const callbackMomentum = () => {
        const minimumSpeedToTriggerMomentum = 0.05;

        keepMovingX = setInterval(() => {
            const lastScrollSpeedX = internalState.current.scrollSpeedX;
            const newScrollSpeedX = lastScrollSpeedX * decayRate;
            internalState.current.scrollSpeedX = newScrollSpeedX;

            const isAtLeft = ref.current.scrollLeft <= 0;
            const isAtRight = ref.current.scrollLeft >= maxHorizontalScroll;
            const hasReachedHorizontalEdges = isAtLeft || isAtRight;

            runScroll();

            if (
                Math.abs(newScrollSpeedX) < minimumSpeedToTriggerMomentum ||
                internalState.current.isMouseDown ||
                hasReachedHorizontalEdges
            ) {
                internalState.current.scrollSpeedX = 0;
                clearInterval(keepMovingX);
            }
        }, timing);

        internalState.current.isDraggingX = false;

        if (applyRubberBandEffect) {
            const transitionDurationInMilliseconds = 250;

            (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
                (child: HTMLElement) => {
                    child.style.transform = `translate3d(0px, 0px, 0px)`; // eslint-disable-line no-param-reassign
                    child.style.transition = `transform ${transitionDurationInMilliseconds}ms`; // eslint-disable-line no-param-reassign
                }
            );

            rubberBandAnimationTimer = setTimeout(
                recoverChildStyle,
                transitionDurationInMilliseconds
            );
        }
    };

    const preventClick = (e: Event) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        e.stopPropagation();
    };

    const getIsMousePressActive = (buttonsCode: number) => {
        return (
            (activeMouseButton === "Left" && buttonsCode === 1) ||
            (activeMouseButton === "Middle" && buttonsCode === 4) ||
            (activeMouseButton === "Right" && buttonsCode === 2)
        );
    };

    const onMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        const isMouseActive = getIsMousePressActive(e.buttons);
        if (!isMouseActive) {
            return;
        }

        internalState.current.isMouseDown = true;
        internalState.current.lastMouseX = e.clientX;
        internalState.current.initialMouseX = e.clientX;
    };

    const onMouseUp = (e: MouseEvent) => {
        const isDragging =
            internalState.current.isDraggingX

        const dx = internalState.current.initialMouseX - e.clientX;

        const isMotionIntentional =
            Math.abs(dx) > safeDisplacement

        const isDraggingConfirmed = isDragging && isMotionIntentional;

        if (isDraggingConfirmed) {
            ref.current.childNodes.forEach((child) => {
                child.addEventListener("click", preventClick);
            });
        } else {
            ref.current.childNodes.forEach((child) => {
                child.removeEventListener("click", preventClick);
            });
        }

        internalState.current.isMouseDown = false;
        internalState.current.lastMouseX = 0;

        ref.current.style.cursor = cursorStyleOfWrapperElement; // eslint-disable-line no-param-reassign
        (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
            (child: HTMLElement, i) => {
                child.style.cursor = cursorStyleOfChildElements[i]; // eslint-disable-line no-param-reassign
            }
        );

        if (isDraggingConfirmed) {
            callbackMomentum();
        }
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!internalState.current.isMouseDown) {
            return;
        }

        e.preventDefault();

        const dx = internalState.current.lastMouseX - e.clientX;
        internalState.current.lastMouseX = e.clientX;

        internalState.current.scrollSpeedX = dx / timing;
        internalState.current.isDraggingX = true;

        ref.current.style.cursor = "grabbing"; // eslint-disable-line no-param-reassign
        (ref.current.childNodes as NodeListOf<HTMLOptionElement>).forEach(
            (child: HTMLElement) => {
                child.style.cursor = "grabbing"; // eslint-disable-line no-param-reassign
            }
        );

        const isAtLeft = ref.current.scrollLeft <= 0 && isScrollableAlongX;
        const isAtRight =
            ref.current.scrollLeft >= maxHorizontalScroll && isScrollableAlongX;
        const isAtAnEdge = isAtLeft || isAtRight

        if (isAtAnEdge && applyRubberBandEffect) {
            rubberBandCallback(e);
        }

        runScroll();
    };

    const handleResize = () => {
        maxHorizontalScroll = ref.current.scrollWidth - ref.current.clientWidth;
    };

    useEffect(() => {
        if (isMounted) {
            window.addEventListener("mouseup", onMouseUp);
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("resize", handleResize);
        }
        return () => {
            window.removeEventListener("mouseup", onMouseUp);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("resize", handleResize);

            clearInterval(keepMovingX);
            clearTimeout(rubberBandAnimationTimer);
        };
    }, [isMounted]);

    return {
        events: {
            onMouseDown,
        },
    };
}
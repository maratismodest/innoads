'use client';
import { useAtom } from 'jotai/index';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { scoreAtom } from '@/state';

import { DEG, getImageByScore } from './Tapper.helper';

export default function Tapper() {
  const [score, setScore] = useAtom(scoreAtom);
  const circle = useRef<HTMLButtonElement>(null);
  const [image, setImage] = useState<string>('');

  const handleImage = () => setImage(getImageByScore(score));

  useEffect(() => {
    handleImage();
  }, []);

  const addOne = () => {
    setScore(prev => prev + 1);
    handleImage();
  };

  const onClick = (event: any) => {
    const rect = circle.current?.getBoundingClientRect() as DOMRect;
    const offfsetX = event.clientX - rect.left - rect.width / 2;
    const offfsetY = event.clientY - rect.top - rect.height / 2;

    const tiltX = (offfsetY / rect.height) * DEG;
    const tiltY = (offfsetX / rect.width) * -DEG;

    circle.current?.style.setProperty('--tiltX', `${tiltX}deg`);
    circle.current?.style.setProperty('--tiltY', `${tiltY}deg`);

    setTimeout(() => {
      circle.current?.style.setProperty('--tiltX', '0deg');
      circle.current?.style.setProperty('--tiltY', '0deg');
    }, 300);

    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = '+1';
    plusOne.style.left = `${event.clientX - rect.left}px`;
    plusOne.style.top = `${event.clientY - rect.top}px`;

    // @ts-ignore
    circle.current.parentElement.appendChild(plusOne);

    addOne();

    setTimeout(() => {
      plusOne.remove();
    }, 2000);
  };

  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-center gap-2">
        <Image src="/assets/coin.png" alt="coin" width={50} height={50} />
        <h2 className="score">{score}</h2>
      </div>

      <button className="circle" onClick={onClick} ref={circle}>
        <Image id="circle" src={image} alt="frog" width={200} height={200} draggable={false} />
      </button>
    </div>
  );
}

import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import {isMobile} from "react-device-detect";
import 'pure-react-carousel/dist/react-carousel.es.css';
import classes from './../../styles/Home.module.scss'
import {options} from "../../assets/options";
import {useEffect, useState} from "react";
import Link from "next/link";


const Categories = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div style={{margin: '8px 0'}}>
            {/*<h2 className={classes.title}>Премиум объявления</h2>*/}
            <CarouselProvider
                naturalSlideWidth={120}
                naturalSlideHeight={100}
                totalSlides={options.length}
                // visibleSlides={options.length}
                visibleSlides={isMobile ? 3 : options.length}
                isPlaying={true}
                interval={5000}
                infinite={true}
                hasMasterSpinner={options.length === 0}
            >
                <Slider>
                    {options.map((item, index) => {
                        return (
                            <Slide key={index} index={index} tabIndex={index}>
                                <Link href={{pathname: "/search", query: {category: item.value}}}>
                                    <a className={classes.category}>
                                        <img
                                            src="https://epsilon.mb-themes.com/oc-content/themes/epsilon/images/small_cat/1.png"
                                            alt=""/>
                                        <h4>{item.label}</h4>
                                    </a>
                                </Link>

                            </Slide>
                        )
                    })}
                </Slider>
            </CarouselProvider>
        </div>
    )
        ;
};

export default Categories;
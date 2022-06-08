import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import {isMobile} from "react-device-detect";
import 'pure-react-carousel/dist/react-carousel.es.css';
import classes from './../../styles/Home.module.scss'
import {categories} from "../../assets/options";
import {useEffect, useState} from "react";
import Link from "next/link";

const Categories = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div style={{margin: '8px 0', backgroundColor: '#F9F8F9', borderRadius: 16}}>
            {/*<h2 className={classes.title}>Премиум объявления</h2>*/}
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={isMobile ? 80 : 55}
                totalSlides={categories.length}
                // visibleSlides={options.length}
                visibleSlides={isMobile ? 3 : categories.length}
                isPlaying={true}
                interval={4000}
                infinite={true}
                hasMasterSpinner={categories.length === 0}
            >
                <Slider>
                    {categories.map((item, index) => {
                        return (
                            <Slide key={index} index={index} tabIndex={index}>
                                <Link href={{pathname: "/search", query: {category: item.value}}}>
                                    <a className={classes.category}>
                                        <div className={classes.categoryImg}>
                                            <img
                                                src={item.image}
                                                alt={item.label}
                                                width={32}
                                            />
                                        </div>
                                        <h5>{item.label}</h5>
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
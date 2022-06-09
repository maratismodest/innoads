import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import {isMobile} from "react-device-detect";
import 'pure-react-carousel/dist/react-carousel.es.css';
import {categories} from "../../assets/options";
import {useEffect, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import styles from './Categories.module.scss'

const Categories = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    return (
        <div className={styles.categories}>
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={isMobile ? 80 : 55}
                totalSlides={categories.length}
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
                                    <a className={styles.category}>
                                        <div className={styles.categoryImg}>
                                            <Image
                                                src={item.image}
                                                alt={item.label}
                                                width={32}
                                                height={32}
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
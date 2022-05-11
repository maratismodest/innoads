import React from 'react';
import {isMobile} from 'react-device-detect';
import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import {PostInterface} from '../../interfaces';
import Item from '../Item/Item';
import classes from './../../styles/Home.module.scss'
import 'pure-react-carousel/dist/react-carousel.es.css';

interface PremiumProps {
    premium: PostInterface[]
}

const Premium = ({premium}: PremiumProps) => {
    return (
        <div>
            <h2 className={classes.title}>Недвижимость</h2>
            <CarouselProvider
                naturalSlideWidth={200}
                naturalSlideHeight={270}
                totalSlides={premium.length}
                visibleSlides={isMobile ? 2 : 4}
                // currentSlide={1}
                isPlaying={true}
                interval={5000}
            >
                <Slider>
                    {premium.map((item, index) => {
                        const {slug, preview} = item
                        return (
                            <Slide index={index} key={item.id} tabIndex={index}>
                                <Item post={item} margin={5}/>
                            </Slide>
                        )
                    })}
                </Slider>
            </CarouselProvider>
        </div>
    );
};

export default Premium;
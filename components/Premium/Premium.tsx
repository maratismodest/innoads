import React, {useEffect, useState} from 'react';
import axios from "axios";
import {isMobile} from 'react-device-detect';
import {CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import {PostInterface} from '../../interfaces';
import Item from '../Item/Item';
import 'pure-react-carousel/dist/react-carousel.es.css';
import classes from './../../styles/Home.module.scss'

import {orderBy} from "lodash";

const getPremiums = async () => {
    try {
        const getPremium = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post?category=5`)
        const premium = orderBy(getPremium.data.content, ['createdAt'], ['desc'])
        return premium
    } catch (e) {
        console.log(e)
        return []
    }
}

const Premium = () => {
    const [premium, setPremium] = useState<PostInterface[]>([])

    useEffect(() => {
        getPremiums().then((res) => setPremium(res))
    }, [])

    return (
        <div>
            <h2 className={classes.title}>Недвижимость</h2>
            <CarouselProvider
                naturalSlideWidth={200}
                naturalSlideHeight={270}
                totalSlides={premium.length}
                visibleSlides={isMobile ? 2 : 4}
                isPlaying={true}
                interval={5000}
                infinite={true}
                hasMasterSpinner={premium.length === 0}
            >
                <Slider>
                    {premium.map((item, index) => {
                        return (
                            <Slide index={index} key={item.id} tabIndex={index}>
                                <Item post={item}/>
                            </Slide>
                        )
                    })}
                </Slider>
            </CarouselProvider>
        </div>
    );
};

export default Premium;
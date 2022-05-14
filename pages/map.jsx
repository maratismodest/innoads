import * as React from 'react';
import Head from 'next/head';
import Map, {FullscreenControl, Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import classes from './../styles/map.module.scss'

const MAPBOX_TOKEN = 'pk.eyJ1IjoibWFyYXRpc21vZGVzdCIsImEiOiJjazkxZTQ3bjUwMXlrM2dwbGl6dTJlamdwIn0.K1EZNZRqVctUQx9BvKCy1A'; // Set your mapbox token here

export default function Home() {
    return (
        <div>
            <Head>
                <title>InnoAds</title>
            </Head>
            <div className={classes.map}>
                <Map
                    initialViewState={{
                        latitude: 55.748483,
                        longitude: 48.749634,
                        zoom: 14
                    }}
                    center={[48.749634, 55.748483]}
                    style={{width: 800, height: 600}}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={MAPBOX_TOKEN}
                >
                    <Marker longitude={48.749634} latitude={55.748483} color="red" />
                    <FullscreenControl />
                </Map>
            </div>

        </div>
    );
}
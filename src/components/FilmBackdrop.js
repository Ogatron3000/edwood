import React, {useState} from "react";
import sliderImagePlaceholder from "../images/slider_placeholder.png";

export default function FilmBackdrop({ backdropPath }) {
    const [sliderImageLoaded, setSliderImageLoaded] = useState(false)

    return (
        <>
            {sliderImageLoaded ? null : <img src={sliderImagePlaceholder} />}
            <img className="slide__img"
                 style={sliderImageLoaded ? {} : {display: 'none'}}
                 src={`https://image.tmdb.org/t/p/w1280/${backdropPath}`}
                 onLoad={() => setSliderImageLoaded(true)}
            />
        </>
    )
}
import React, {useState} from "react";
import posterPlaceholder from "../images/poster_placeholder.png";

export default function FilmPoster({ posterPath }) {
    const [posterLoaded, setPosterLoaded] = useState(false)

    return (
        <>
            {posterLoaded ? null : <img src={posterPlaceholder} />}
            <img style={posterLoaded ? {} : {display: 'none'}}
                 src={`https://image.tmdb.org/t/p/w300/${posterPath}`}
                 onLoad={() => setPosterLoaded(true)}
            />
        </>
    )
}
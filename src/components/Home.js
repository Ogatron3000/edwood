import Slider from "./Slider";
import FilmList from "./FilmList";
import axios from "axios";
import {useEffect, useState} from "react";;

export default function Home() {
    const [genres, setGenres] = useState();
    const [nowPlayingFilms, setNowPlayingFilms] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_BASE + 'genre/movie/list' + process.env.REACT_APP_API_KEY)
            .then(({ data }) => setGenres(data.genres))
        axios.get(process.env.REACT_APP_URL_BASE + 'movie/now_playing' + process.env.REACT_APP_API_KEY)
            .then(({ data }) => setNowPlayingFilms(data.results));
    }, []);

    return (
        <>
            {nowPlayingFilms && <Slider films={nowPlayingFilms} genres={genres} />}
            <FilmList nowPlayingFilms={nowPlayingFilms} />
        </>
    )
}
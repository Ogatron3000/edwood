import Slider from "./Slider";
import FilmList from "./FilmList";
import axios from "axios";
import {useEffect, useState} from "react";

export default function Home() {
    const [genres, setGenres] = useState();
    const [nowPlayingFilms, setNowPlayingFilms] = useState();
    const [popularFilms, setPopularFilms] = useState();
    const [comingSoonFilms, setComingSoonFilms] = useState();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_BASE + 'genre/movie/list' + process.env.REACT_APP_API_KEY)
            .then(({ data }) => setGenres(data.genres))
        axios.get(process.env.REACT_APP_URL_BASE + 'movie/now_playing' + process.env.REACT_APP_API_KEY)
            .then(({ data }) => setNowPlayingFilms(data.results));
        axios.get(process.env.REACT_APP_URL_BASE + 'movie/popular' + process.env.REACT_APP_API_KEY)
            .then(({ data }) => setPopularFilms(data.results));
        axios.get(process.env.REACT_APP_URL_BASE + 'movie/upcoming' + process.env.REACT_APP_API_KEY)
            .then(({ data }) => setComingSoonFilms(data.results));
    }, []);

    return (
        <>
            {nowPlayingFilms && <Slider films={nowPlayingFilms} genres={genres} />}
            {popularFilms &&
                <FilmList popularFilms={popularFilms} nowPlayingFilms={nowPlayingFilms} comingSoonFilms={comingSoonFilms} />}
        </>
    )
}
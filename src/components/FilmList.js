import './FilmList.css';
import {useEffect, useState} from "react";
import FilmCard from "./FilmCard";
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";

export default function FilmList({ nowPlayingFilms }) {
    const [films, setFilms] = useState();

    let {filter: filterParam} = useParams();
    filterParam = filterParam ? filterParam : 'popular';

    useEffect(() => {
        if (filterParam === 'now_playing' && nowPlayingFilms) {
            setFilms(nowPlayingFilms)
        } else {
            axios.get(process.env.REACT_APP_URL_BASE + `movie/${filterParam}` + process.env.REACT_APP_API_KEY)
                .then(({ data }) => setFilms(data.results));
        }
    }, [filterParam]);

    const sortingFilters = ['popular', 'now_playing', 'upcoming'];

    const sorting = sortingFilters.map(filter => {
        const activeClass = filterParam === filter ? 'button-active' : '';
        const displayName = filter.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
        return (
            <NavLink to={`/${filter}`}
                     key={filter}
                     id={filter}
                     className={`button button-secondary ${activeClass}`}>
                {displayName}
            </NavLink>
        )
    });

    const filmCards = films && films.map(film => {
        return (
            <FilmCard film={film} key={film.id} />
        )
    })

    return (
        <div className="films container">
            <div className="films__title">
                <h2>Films</h2>
                <div className="films__controls">
                    {sorting}
                </div>
            </div>
            <div className="films__list">
                {filmCards}
            </div>
        </div>
    )
}

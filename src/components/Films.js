import './Films.css';
import React, {useEffect, useRef, useState} from "react";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import FilmList from "./FilmList";

export default function Films({ nowPlayingFilms }) {
    const [filmsData, setFilmsData] = useState();

    let {filter: filterParam, page} = useParams();
    filterParam = filterParam ? filterParam : 'popular';
    page = page ? page : 1;

    useEffect(() => {
        if (filterParam === 'now_playing' && page === 1 && nowPlayingFilms) {
            setFilmsData(nowPlayingFilms)
        } else {
            axios.get(process.env.REACT_APP_URL_BASE + `movie/${filterParam}` + process.env.REACT_APP_API_KEY + `&page=${page}`)
                .then(({ data }) => setFilmsData(data));
        }
    }, [filterParam, page]);

    const sortingFilters = ['popular', 'now_playing', 'upcoming'];
    const sorting = sortingFilters.map(filter => {
        const activeClass = filterParam === filter ? 'button-active' : '';
        const displayName = filter.split('_').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
        return (
            <NavLink to={`/${filter}/1`}
                     key={filter}
                     id={filter}
                     className={`button button-secondary ${activeClass}`}>
                {displayName}
            </NavLink>
        )
    });

    const filmsRef = useRef()

    return (
        <div className="films container" ref={filmsRef}>
            <div className="films__title">
                <h2>Films</h2>
                <div className="films__controls">
                    {sorting}
                </div>
            </div>
            {filmsData && <FilmList filmsData={filmsData} filterParam={filterParam} filmsRef={filmsRef} page={page} />}
        </div>
    )
}

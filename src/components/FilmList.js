import './FilmList.css';
import React, {useEffect, useRef, useState} from "react";
import FilmCard from "./FilmCard";
import {NavLink, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import ReactPaginate from "react-paginate";

export default function FilmList({ nowPlayingFilms }) {
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

    const filmCards = filmsData && filmsData.results.map(film => {
        return (
            <FilmCard film={film} key={film.id} />
        )
    })

    const myRef = useRef(null)

    const executeScroll = () => myRef.current.scrollIntoView()
    const navigate = useNavigate();
    function handlePageChange(data) {
        navigate(`/${filterParam}/${data.selected + 1}`);
        executeScroll()
    };

    return (
        <div className="films container" ref={myRef}>
            <div className="films__title">
                <h2>Films</h2>
                <div className="films__controls">
                    {sorting}
                </div>
            </div>
            <div className="films__list">
                {filmCards}
            </div>
            {filmsData &&
                <ReactPaginate
                    className={"films__pagination"}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageChange}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    pageCount={Math.min(filmsData.total_pages, 500)}
                    previousLabel="<"
                    disableInitialCallback={true}
                    forcePage={page - 1}
                    activeClassName={"active-page"}
                />
            }
        </div>
    )
}

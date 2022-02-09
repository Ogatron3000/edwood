import './FilmList.css';
import FilmControls from "./FilmControls";
import {useState} from "react";

export default function FilmList({ popularFilms, nowPlayingFilms, comingSoonFilms }) {
    const [activeTab, setActiveTab] = useState('popular');

    function handleClick(e) {
        setActiveTab(e.target.id)
    }

    const sortingCategories = ['Popular', 'In Theaters', 'Coming Soon'];
    const buttons = sortingCategories.map(category => {
        const activeClass = activeTab === category.toLowerCase() ? 'button-active' : '';
        return (
            <button key={category.toLowerCase()}
                    id={category.toLowerCase()}
                    className={`button button-secondary ${activeClass}`}
                    onClick={handleClick}>
                {category}
            </button>
        )
    });

    let films;
    if (activeTab === 'popular') {
        films = popularFilms;
    } else if (activeTab === 'in theaters') {
        films = nowPlayingFilms;
    } else if (activeTab === 'coming soon') {
        films = comingSoonFilms;
    }

    const filmCards = films.map(film => {
        return (
            <div className="film" key={film.id}>
                <a href="#">
                    <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt=""/>
                </a>
                <div className="film__info">
                    <h3>{film.title}</h3>
                    <div className="film__bottom">
                        <div className="film__rating">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {film.vote_average}
                        </div>
                        <FilmControls/>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="films container">
            <div className="films__title">
                <h2>Films</h2>
                <div className="films__controls">
                    {buttons}
                </div>
            </div>
            <div className="films__list">
                {filmCards}
            </div>
        </div>
    )
}

import './FilmList.css';
import FilmControls from "./FilmControls";
import {useState} from "react";
import FilmCard from "./FilmCard";

export default function FilmList({ popularFilms, nowPlayingFilms, comingSoonFilms }) {
    const [activeTab, setActiveTab] = useState('popular');

    const sortingCategories = ['Popular', 'In Theaters', 'Coming Soon'];
    const buttons = sortingCategories.map(category => {
        const activeClass = activeTab === category.toLowerCase() ? 'button-active' : '';
        return (
            <button key={category.toLowerCase()}
                    id={category.toLowerCase()}
                    className={`button button-secondary ${activeClass}`}
                    onClick={(e) => setActiveTab(e.target.id)}>
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
            <FilmCard film={film} key={film.id} />
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

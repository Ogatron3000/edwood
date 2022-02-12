import './FilmDetails.css'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import Cast from "./Cast";
import Crew from "./Crew";
import ProductionDetails from "./ProductionDetails";
import TrailerButton from "./TrailerButton";
import convertToFiveStarRating from "../helpers/convertToFiveStarRating";

export default function FilmDetails() {
    const [film, setFilm] = useState();
    const [activeTab, setActiveTab] = useState('cast');

    const {filmId} = useParams();

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_BASE + `movie/${filmId}` + process.env.REACT_APP_API_KEY + '&append_to_response=credits,videos')
            .then(({ data }) => setFilm(data));
    }, [filmId]);

    function activateTab(e) {
        setActiveTab(e.target.id);
    }

    let releaseYear, director;
    if (film) {
        releaseYear = film.release_date && film.release_date.split('-')[0];
        director = film.credits.crew.find(c => c.job === 'Director');
    }

    return (
        <>
            {film &&
                <div className="film">
                    {film.backdrop_path &&
                        <div className="film__img--wrapper">
                            <div className="film__img">
                                <img src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} alt=""/>
                                <div className="film__img-overlay"/>
                            </div>
                        </div>
                    }
                    <div className="film__details--wrapper">
                        <div className="film__details">
                            <div className="film__top--wrapper">
                                <div className="film__top container" style={film.backdrop_path ? null : {paddingTop: 'var(--page-padding)'}}>
                                    <div className="film__info">
                                        <h1 className="film__title hide-for-desktop">{film.title}</h1>
                                        <div className="film__year hide-for-desktop">
                                            {releaseYear}
                                            {director && ' · Directed by'}
                                        </div>
                                        <div className="film__director hide-for-desktop">
                                            {director?.name}
                                        </div>
                                        <div className="film__rating">
                                            <span>{convertToFiveStarRating(film.vote_average)}</span>
                                            <div className="film__stars" style={{'--rating': film.vote_average}}/>
                                        </div>
                                        <div className="film__trailer-and-duration">
                                            <TrailerButton videos={film.videos.results}/>
                                            <span>
                                                {film.runtime > 0 && film.runtime + ' mins'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="film__poster">
                                        {film.poster_path && <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt={film.title + ' poster.'}/>}
                                    </div>
                                </div>
                            </div>
                            <div className="film__bottom container">
                                <h1 className="film__title show-for-desktop">{film.title}</h1>
                                <div className="film__below-title show-for-desktop">
                                    <div className="film__year">
                                        {releaseYear}
                                        {director && ' · Directed by'}
                                    </div>
                                    <div className="film__director">
                                        {director?.name}
                                    </div>
                                </div>
                                {film.tagline &&
                                    <h2 className="film__tagline">
                                        {film.tagline}
                                    </h2>
                                }
                                {film.overview &&
                                    <p className="film__overview">
                                        {film.overview}
                                    </p>
                                }
                                <div className="film__tabs">
                                    <button
                                        className={"button button-secondary " + (activeTab === 'cast' ? 'button-active' : '')}
                                        id='cast'
                                        onClick={activateTab}
                                    >
                                        Cast
                                    </button>
                                    <button
                                        className={"button button-secondary " + (activeTab === 'crew' ? 'button-active' : '')}
                                        id='crew'
                                        onClick={activateTab}
                                    >
                                        Crew
                                    </button>
                                    <button
                                        className={"button button-secondary " + (activeTab === 'details' ? 'button-active' : '')}
                                        id='details'
                                        onClick={activateTab}
                                    >
                                        Details
                                    </button>
                                    <button
                                        className={"button button-secondary " + (activeTab === 'genres' ? 'button-active' : '')}
                                        id='genres'
                                        onClick={activateTab}
                                    >
                                        Genres
                                    </button>
                                </div>
                                <div className="film__tab-content">
                                    {activeTab === 'cast' && <Cast cast={film.credits.cast} />}
                                    {activeTab === 'crew' && <Crew crew={film.credits.crew} />}
                                    {activeTab === 'details' && <ProductionDetails film={film} />}
                                    {activeTab === 'genres' && film.genres.map(g => <span key={g.id}>{g.name}</span>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

import './FilmDetails.css'
import {useParams} from "react-router-dom";
import React, {useEffect} from "react";
import TrailerButton from "./TrailerButton";
import convertToFiveStarRating from "../helpers/convertToFiveStarRating";
import SimilarFilms from "./SimilarFilms";
import FilmDetailsTabs from "./FilmDetailsTabs";
import WatchlistButton from "./WatchlistButton";
import {useGetFilmDetailsQuery} from "../slices/apiSlice";
import Spinner from "./Spinner";
import FilmBackdrop from "./FilmBackdrop";
import FilmPoster from "./FilmPoster";

export default function FilmDetails() {
    const {filmId} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [filmId])

    const {
        data: film,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useGetFilmDetailsQuery(filmId)

    let content

    if (isLoading || isFetching) {
        content =
            <>
                <div style={{ height: '50vh', width: '100%', background: 'var(--black)', position: 'relative'}}><Spinner /></div>
                <div style={{ height: '50vh', width: '100%', position: 'relative'}}><Spinner /></div>
            </>
    } else if (isSuccess) {
        let releaseYear = film.release_date && film.release_date.split('-')[0];
        let director = film.credits.crew.find(c => c.job === 'Director');

        content =
            <div className="film">
                {film.backdrop_path &&
                    <div className="film__img--wrapper">
                        <div className="film__img">
                            <FilmBackdrop backdropPath={film.backdrop_path} />
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
                                    <div className="film__rating-and-watchlist-button">
                                        <div className="film__rating">
                                            <span>{convertToFiveStarRating(film.vote_average)}</span>
                                            <div className="film__stars" style={{'--rating': film.vote_average}}/>
                                        </div>
                                        <WatchlistButton film={film} />
                                    </div>
                                    <div className="film__trailer-and-duration">
                                        <TrailerButton videos={film.videos.results}/>
                                        <span>
                                                {film.runtime > 0 && film.runtime + ' mins'}
                                            </span>
                                    </div>
                                </div>
                                <div className="film__poster">
                                    {film.poster_path && <FilmPoster posterPath={film.poster_path} />}
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
                            <FilmDetailsTabs film={film} />
                        </div>
                    </div>
                    <SimilarFilms films={film.similar.results} />
                </div>
            </div>
    } else if (isError) {
        content = <div style={{color: 'var(--black)'}}>{error.status}: {error.data.status_message}</div>
    }

    return <>{content}</>
}

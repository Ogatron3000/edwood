import './FilmCard.css';
import {Link} from "react-router-dom";
import convertToFiveStarRating from "../helpers/convertToFiveStarRating";
import {addToWatchlist, removeFromWatchlist} from "../slices/watchlistSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";

export default function FilmCard({ film }) {
    const [isOnWatchlist, setIsOnWatchlist] = useState(true);

    const dispatch = useDispatch();
    const watchlist = useSelector(state => state.watchlist);
    const {userId, token} = useSelector(state => state.auth.userData);

    useEffect(() => setIsOnWatchlist(watchlist.films.find(f => f.id === film.id)), [watchlist])

    function handleClick(film, userId, token) {
        setIsOnWatchlist(prevState => !prevState)
        if (isOnWatchlist) {
            dispatch(removeFromWatchlist({
                filmId: film.id,
                userId,
                token,
            }))
        } else {
            dispatch(addToWatchlist({
                film,
                userId,
                token,
            }))
        }
    }

    return (
        <div className="film-card">
            <Link to={`/film/${film.id}`}>
                <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt=""/>
            </Link>
            <div className="film-card__info">
                <h3>{film.title}</h3>
                <div className="film-card__bottom">
                    <div className="film-card__rating">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {convertToFiveStarRating(film.vote_average)}
                    </div>
                    <a className="film-card__watchlist" onClick={() => handleClick(film, userId, token)}>
                        <svg style={{color: isOnWatchlist ? '#8bb539' : ''}} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

import './WatchlistButton.css'
import {useDispatch, useSelector} from "react-redux";
import {addToWatchlist, removeFromWatchlist, selectFilmById} from "../slices/watchlistSlice";

export default function WatchlistButton({ film }) {
    const dispatch = useDispatch();
    const isOnWatchlist = useSelector(state => !!selectFilmById(state, film.id));
    const {userData, isLoggedIn} = useSelector(state => state.auth);
    const {userId, token} = userData;

    function handleClick(film, userId, token) {
        if (!isLoggedIn) {
            return
        }
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
        <button className="watchlist-button"
                onClick={() => handleClick(film, userId, token)}
                aria-label={isOnWatchlist ? 'Remove from watchlist.' : 'Add to watchlist.'}>
            <svg style={{color: isOnWatchlist ? 'var(--green)' : ''}} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
        </button>
    )
}

import './Watchlist.css';
import {useSelector} from "react-redux";
import FilmList from "./FilmList";
import {selectFilmById, selectFilmIds} from "../slices/watchlistSlice";

export default function Watchlist() {
    const filmIds = useSelector(selectFilmIds);

    return (
        <div className='watchlist container'>
            <h1 className='watchlist__title'>Watchlist</h1>
            <FilmList filmIds={filmIds} selector={selectFilmById} />
        </div>
    )
}

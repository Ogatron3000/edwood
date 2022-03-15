import './Watchlist.css';
import {useSelector} from "react-redux";
import FilmList from "../../components/FilmList/FilmList";
import {selectAllFilms} from "../../slices/watchlistSlice";

export default function Watchlist() {
    const films = useSelector(selectAllFilms);

    return (
        <div className='watchlist container'>
            <h1 className='watchlist__title'>Watchlist</h1>
            <FilmList films={films} />
        </div>
    )
}

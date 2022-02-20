import './Watchlist.css';
import {useSelector} from "react-redux";
import FilmList from "./FilmList";

export default function Watchlist() {
    const {films} = useSelector(state => state.watchlist);

    return (
        <div className='watchlist container'>
            <h1 className='watchlist__title'>Watchlist</h1>
            <FilmList films={films} />
        </div>
    )
}

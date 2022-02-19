import './Watchlist.css';
import {useSelector} from "react-redux";
import FilmCard from "./FilmCard";

export default function Watchlist() {
    const {films} = useSelector(state => state.watchlist);

    return (
        <div className='container' style={{paddingTop: 'var(--page-padding)', paddingBottom: 'var(--page-padding)'}}>
            <h1 style={{color: 'var(--black)', marginBottom: 'var(--page-padding'}}>Watchlist</h1>
            <div className='film-list'>
                {films.map(film => <FilmCard key={film.id} film={film} />)}
            </div>
        </div>
    )
}

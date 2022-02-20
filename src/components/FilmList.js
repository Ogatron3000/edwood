import './FilmList.css';
import FilmCard from "./FilmCard";

export default function FilmList({ films }) {

    const filmCards = films.map(film => {
        return (
            <FilmCard film={film} key={film.id} />
        )
    })

    return (
         <div className="film-list">
             {filmCards}
         </div>
    )
}

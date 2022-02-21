import './FilmList.css';
import FilmCard from "./FilmCard";

export default function FilmList({ filmIds, selector }) {

    const filmCards = filmIds.map(filmId => {
        return (
            <FilmCard filmId={filmId} selector={selector} key={filmId} />
        )
    })

    return (
         <div className="film-list">
             {filmCards}
         </div>
    )
}

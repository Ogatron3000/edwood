import FilmPoster from "./FilmPoster";
import {NavLink} from "react-router-dom";
import {useGetFilmCreditsQuery} from "../slices/apiSlice";
import Spinner from "./Spinner/Spinner";

export default function SearchResult({ film, clearInput }) {
    const {data, isSuccess} = useGetFilmCreditsQuery(film.id)

    return (
        <NavLink to={`film/${film.id}`} className="search__result" onClick={clearInput}>
            {isSuccess
                ?
                <>
                    {film.poster_path && <FilmPoster posterPath={film.poster_path} />}
                    <div>
                        <h3>{film.title}</h3>
                        <div>{film.release_date?.split('-')[0]}</div>
                        <div>{data.crew.find(crew => crew.job === 'Director')?.name}</div>
                    </div>
                </>
                :
                <Spinner />
            }
        </NavLink>
    )
}

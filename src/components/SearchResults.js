import './SearchResults.css';
import FilmList from "./FilmList";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import {createRef, useEffect, useState} from "react";

export default function SearchResults() {
    const [filmsData, setFilmsData] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const page = searchParams.get('page');

    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_BASE + `search/movie` + process.env.REACT_APP_API_KEY + `&query=${query}&page=${page}`)
            .then(({ data }) => setFilmsData(data));
        }, [query, page]);

    const parentRef = createRef();
    function handlePageChange(data) {
        setSearchParams({query, page: data.selected + 1})
        parentRef.current.scrollIntoView();
    }

    return (
        <div className="search-results container" ref={parentRef}>
            <h1 className="search-results__title">Results for "{query}"</h1>
            {filmsData && <FilmList filmsData={filmsData} page={page} handlePageChange={handlePageChange} />}
        </div>
    )
}

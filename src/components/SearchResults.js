import './SearchResults.css';
import FilmList from "./FilmList";
import {useSearchParams} from "react-router-dom";
import axios from "axios";
import React, {createRef, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";

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
            {filmsData &&
                <>
                    <FilmList films={filmsData.results}/>
                    <ReactPaginate
                        className={"film-list-pagination"}
                        breakLabel="..."
                        nextLabel=">"
                        onPageChange={handlePageChange}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        pageCount={Math.min(filmsData.total_pages, 500)}
                        previousLabel="<"
                        disableInitialCallback={true}
                        forcePage={page - 1}
                        activeClassName={"active-page"}
                        renderOnZeroPageCount={null}
                    />
                </>
            }
        </div>
    )
}

import './SearchResults.css';
import FilmList from "./FilmList";
import {useSearchParams} from "react-router-dom";
import React, {createRef, useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useSearchMutation} from "../slices/apiSlice";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const page = searchParams.get('page');

    const {
        data: filmsData,
        isLoading,
        isFetching,
        isSuccess,
        isError,
        error
    } = useSearchMutation({query, page})

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

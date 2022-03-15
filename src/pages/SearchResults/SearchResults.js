import './SearchResults.css';
import FilmList from "../../components/FilmList/FilmList";
import {useSearchParams} from "react-router-dom";
import React, {createRef} from "react";
import ReactPaginate from "react-paginate";
import {useSearchQuery} from "../../slices/apiSlice";
import Spinner from "../../components/Spinner/Spinner";

export default function SearchResults() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query');
    const page = searchParams.get('page');

    const {
        data: filmsData,
        isLoading,
        isFetching,
        isSuccess
    } = useSearchQuery({query, page})

    const parentRef = createRef();
    function handlePageChange(data) {
        setSearchParams({query, page: data.selected + 1})
        parentRef.current.scrollIntoView();
    }

    let content

    if (isLoading) {
        content = <Spinner />
    } else if (isSuccess) {
        content =
            <>
                <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <FilmList films={filmsData.results}/>
                </div>
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

    return (
        <div className="search-results container" ref={parentRef}>
            <h1 className="search-results__title">Results for "{query}"</h1>
            {content}
        </div>
    )
}

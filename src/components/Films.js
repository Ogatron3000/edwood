import './Films.css';
import React, {createRef} from "react";
import {useParams, useNavigate} from "react-router-dom";
import FilmList from "./FilmList";
import ReactPaginate from "react-paginate";
import FilmsControls from "./FilmsControls";
import {useGetFilmsQuery} from "../slices/apiSlice";
import Spinner from "./Spinner";

export default function Films() {
    let {filter = 'popular', page = 1} = useParams();

    const {
        data: films,
        isLoading,
        isSuccess,
        isFetching,
        isError,
        error
    } = useGetFilmsQuery({ filter, page })

    let content

    if (isLoading) {
        content = <div style={{ height: '50vh', width: '100%', position: 'relative'}}><Spinner /></div>
    } else if (isSuccess) {
        content =
            <>
                <div style={{opacity: isFetching ? 0.5 : 1}}>
                    <FilmList films={films.results} />
                </div>
                <ReactPaginate
                    className={"film-list-pagination"}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageChange}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    pageCount={Math.min(films.total_pages, 500)}
                    previousLabel="<"
                    disableInitialCallback={true}
                    forcePage={page - 1}
                    activeClassName={"active-page"}
                    renderOnZeroPageCount={null}
                />
            </>
    } else if (isError) {
        content = <div style={{color: 'var(--black)'}}>{error.status}: {error.data.status_message}</div>
    }

    const parentRef = createRef();
    const navigate = useNavigate();
    function handlePageChange(data) {
        navigate(`/${filter}/${data.selected + 1}`);
        parentRef.current.scrollIntoView();
    }

    return (
        <div className="films container" ref={parentRef}>
            <div className="films__title">
                <h2>Films</h2>
                <div className="films__controls">
                    <FilmsControls filter={filter}/>
                </div>
            </div>
            {content}
        </div>
    )
}

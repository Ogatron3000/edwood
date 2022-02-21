import './Films.css';
import React, {createRef, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import FilmList from "./FilmList";
import ReactPaginate from "react-paginate";
import {useDispatch, useSelector} from "react-redux";
import {fetchFilms, selectFilmById} from "../slices/filmsSlice";
import FilmsControls from "./FilmsControls";

export default function Films() {
    const {ids: filmIds, totalPages, status: loadingStatus} = useSelector(state => state.films)
    const dispatch = useDispatch()

    let {filter, page} = useParams();
    filter = filter ? filter : 'popular';
    page = page ? page : 1;

    useEffect(() => {
        dispatch(fetchFilms({filter, page}))
    }, [filter, page]);

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
            <div style={{opacity: loadingStatus === 'loading' ? 0.5 : 1, transitionDuration: '0.5s' }}>
                <FilmList filmIds={filmIds} selector={selectFilmById} />
            </div>
            <ReactPaginate
                className={"film-list-pagination"}
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageChange}
                marginPagesDisplayed={1}
                pageRangeDisplayed={2}
                pageCount={Math.min(totalPages, 500)}
                previousLabel="<"
                disableInitialCallback={true}
                forcePage={page - 1}
                activeClassName={"active-page"}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

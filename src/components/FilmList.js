import './FilmList.css';
import ReactPaginate from "react-paginate";
import FilmCard from "./FilmCard";

export default function FilmList({ filmsData, handlePageChange, page }) {

    const filmCards = filmsData && filmsData.results.map(film => {
        return (
            <FilmCard film={film} key={film.id} />
        )
    })

    return (
        <>
            <div className="film-list">
                {filmCards}
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
            />
        </>
    )
}

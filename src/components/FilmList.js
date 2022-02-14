import ReactPaginate from "react-paginate";
import FilmCard from "./FilmCard";
import {useNavigate} from "react-router-dom";

export default function FilmList({ filmsData, filmsRef, filterParam, page }) {
    const executeScroll = () => filmsRef.current.scrollIntoView()
    const navigate = useNavigate();
    function handlePageChange(data) {
        navigate(`/${filterParam}/${data.selected + 1}`);
        executeScroll()
    }

    const filmCards = filmsData && filmsData.results.map(film => {
        return (
            <FilmCard film={film} key={film.id} />
        )
    })

    return (
        <>
            <div className="films__list">
                {filmCards}
            </div>
            <ReactPaginate
                className={"films__pagination"}
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

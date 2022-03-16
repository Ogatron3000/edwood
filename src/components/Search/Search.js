import './Search.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSearchQuery} from "../../slices/apiSlice";
import SearchResult from "../SearchResult";

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [clearButtonVisible, setClearButtonVisible] = useState(false);

    const {data: searchResults, isFetching, isSuccess} =
        useSearchQuery({
            query: searchValue,
            page: 1
        }, {skip: !searchValue.trim()})

    function clearInput() {
        setSearchValue('');
        setClearButtonVisible(false);
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            clearInput();
        }
    }

    function handleChange(e) {
        setSearchValue(e.target.value);
        if (e.target.value !== '') {
            setClearButtonVisible(true);
        } else {
            setClearButtonVisible(false);
        }
    }

    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        if (searchValue) {
            navigate(`/search?query=${searchValue}&page=${1}`);
            clearInput();
        }
    }

    return (
        <div className="search">
            <form className="search__form" onSubmit={handleSubmit}>
                <label htmlFor="search" className="visually-hidden">Search:</label>
                <input
                    className="search__input"
                    value={searchValue}
                    onChange={handleChange}
                    type="search"
                    id="search"
                    autoComplete="off"
                    placeholder="Find film..."
                />

                <div className="search__buttons">
                    {clearButtonVisible &&
                        <div
                            onClick={clearInput}
                            onKeyDown={handleKeyDown}
                            className="search__clear hidden"
                            tabIndex="0"
                            aria-label="Clear search"
                            role="button"
                            id="clear"
                        >
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                    }

                    <button className="search__submit" aria-label="Submit search">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </button>
                </div>
            </form>

            <div className="search__results" style={(searchValue && searchResults?.results.length > 0) ? {
                minWidth: '100%',
                height: `${Math.min(5, searchResults.results.length) * 100}px`
            } : null}>
                {(searchValue && !isFetching && isSuccess) &&
                    searchResults.results.slice(0, 5).map(film =>
                        <SearchResult key={film.id} film={film} clearInput={clearInput} />)
                }
            </div>
        </div>
    )
}

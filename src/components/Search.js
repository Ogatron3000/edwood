import './Search.css'
import {useEffect, useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {useGetFilmCreditsMutation, useSearchMutation} from "../slices/apiSlice";

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [clearButtonVisible, setClearButtonVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const [search] = useSearchMutation()
    const [getFilmCredits, {isLoading}] = useGetFilmCreditsMutation()

    useEffect(() => {
        setSearchResults([])
        if (searchValue.trim()) {
            search({query: searchValue, page: 1})
                .then(({ data }) => {
                    let films = data.results.slice(0, 5)
                    let creditsPromises = films.map(film => getFilmCredits(film.id))
                    Promise.all(creditsPromises).then(response => {
                        response.forEach((res, i) => {
                            films[i] = {...films[i], director: res.data.crew.find(crew => crew.job === 'Director')?.name}
                        });
                        setSearchResults(films);
                    })
            })
        }
    }, [searchValue]);

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
        navigate(`/search?query=${searchValue}&page=${1}`);
        clearInput();
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

            {searchResults.length > 0 &&
                <div className="search__results" style={isLoading ? {
                    height: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                } : null}>
                    {isLoading
                        ?
                        "Loading..."
                        :
                        searchResults.map(film => {
                            return (
                                <NavLink to={`film/${film.id}`} className="search__result" key={film.id} onClick={clearInput}>
                                    {film.poster_path && <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt=""/>}
                                    <div>
                                        <h3>{film.title}</h3>
                                        <div>{film.release_date?.split('-')[0]}</div>
                                        <div>{film.director}</div>
                                    </div>
                                </NavLink>
                            )
                        })
                    }
                </div>
            }


        </div>
    )
}

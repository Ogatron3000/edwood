import './Search.css'
import {useEffect, useState} from "react";
import axios from "axios";

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [clearButtonVisible, setClearButtonVisible] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setSearchResults([])
        if (searchValue) {
            axios.get(`${process.env.REACT_APP_URL_BASE}search/movie${process.env.REACT_APP_API_KEY}&query=${searchValue}`)
                .then(({ data }) => {
                    let films = data.results.slice(0, 3);
                    let creditsPromises = films.map(film => axios.get(`${process.env.REACT_APP_URL_BASE}movie/${film.id}/credits${process.env.REACT_APP_API_KEY}`))
                    Promise.all(creditsPromises).then(response => {
                        response.forEach((res, i) => films[i].director = res.data.crew.find(crew => crew.job === 'Director').name);
                        setSearchResults(films);
                    });
                })
        }
    }, [searchValue]);

    function clearOnEnter(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            setSearchValue('');
            setClearButtonVisible(false);
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

    return (
        <div className="search">
            <form className="search__form">
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
                            onClick={() => setSearchValue('')}
                            onKeyDown={clearOnEnter}
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
                <div className="search__results">
                    {searchResults.map(film => {
                        return (
                            <a className="search__result" href="#" key={film.id}>
                                <img src={`https://image.tmdb.org/t/p/original${film.poster_path}`} alt=""/>
                                <div>
                                    <h3>{film.title}</h3>
                                    <div>{film.release_date.split('-')[0]}</div>
                                    <div>{film.director}</div>
                                </div>
                            </a>
                        )
                    })}
                </div>
            }
        </div>
    )
}

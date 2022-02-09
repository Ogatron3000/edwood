import './Search.css'
import {useState} from "react";

export default function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [clearButtonVisible, setClearButtonVisible] = useState(false);

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
        <form className="search">
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
    )
}

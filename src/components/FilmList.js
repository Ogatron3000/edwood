import './FilmList.css';
import FilmControls from "./FilmControls";

export default function FilmList() {
    return (
        <div className="films container">
            <div className="films__title">
                <h2>Films</h2>
                <div className="films__controls">
                    <button className="button button-primary">Popular</button>
                    <button className="button button-secondary">In Theaters</button>
                    <button className="button button-secondary">Coming Soon</button>
                </div>
            </div>
            <div className="films__list">
                <div className="film">
                    <a href="#">
                        <img src="https://a.ltrbxd.com/resized/film-poster/5/8/5/2/5/8/585258-the-worst-person-in-the-world-0-150-0-225-crop.jpg?k=9ca2e568ba" alt=""/>
                    </a>
                    <div className="film__info">
                        <h3>The Worst Person In The World</h3>
                        <div className="film__bottom">
                            <div className="film__rating">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                3.7
                            </div>
                            <FilmControls/>
                        </div>
                    </div>
                </div>
                <div className="film">
                    <a href="#">
                        <img src="https://a.ltrbxd.com/resized/film-poster/8/3/2/4/4/4/832444-the-house-0-150-0-225-crop.jpg?k=5e3c9c7c95" alt=""/>
                    </a>
                    <div className="film__info">
                        <h3>The House</h3>
                        <div className="film__bottom">
                            <div className="film__rating">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                3.7
                            </div>
                            <FilmControls/>
                        </div>
                    </div>
                </div>
                <div className="film">
                    <a href="#">
                        <img src="https://a.ltrbxd.com/resized/film-poster/5/7/2/1/1/9/572119-scream-0-150-0-225-crop.jpg?k=49232ddf72" alt=""/>
                    </a>
                    <div className="film__info">
                        <h3>Scream</h3>
                        <div className="film__bottom">
                            <div className="film__rating">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                3.7
                            </div>
                            <FilmControls/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

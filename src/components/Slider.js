import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import './Slider.css';
import {Pagination} from "swiper";
import {NavLink} from "react-router-dom";
import convertToFiveStarRating from "../helpers/convertToFiveStarRating";

export default function Slider({ films, genres }) {
    const pagination = {
        clickable: true
    }

    const swiperSlides = films.slice(0, 4).map((film) => {
            return (
                <SwiperSlide key={film.id}>
                    <div className="slide">
                        <img className="slide__img" src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} alt=""/>
                        <div className="slide__content">
                            <h2 className="slide__title">{film.title}</h2>
                            <div className="slide__info">
                                <span className="slide__rating">{convertToFiveStarRating(film.vote_average)}</span>
                                <div className="slide__genre">
                                    {film.genre_ids.map(id => genres.find(genre => genre.id === id).name).join(' | ')}
                                </div>
                            </div>
                            <p className="slide__desc">{film.overview}</p>
                            <NavLink to={`/film/${film.id}`} className="button button-primary">Details</NavLink>
                        </div>
                    </div>
                </SwiperSlide>
            )
        })

    return (
            <Swiper
                slidesPerView={1}
                loop={true}
                autoHeight={true}
                pagination={pagination}
                modules={[Pagination]}
                className="slider"
            >
                {swiperSlides}
            </Swiper>
    );
};

import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import './Slider.css';
import {Pagination} from "swiper";
import {NavLink} from "react-router-dom";
import convertToFiveStarRating from "../../helpers/convertToFiveStarRating";
import React from 'react'
import {useGetFilmsQuery, useGetGenresQuery} from "../../slices/apiSlice";
import Spinner from "../Spinner/Spinner";
import FilmBackdrop from "../FilmBackdrop";

export default React.memo(function Slider() {
    const {
        data: films,
        isLoading: isLoadingFilms,
        isSuccess: isSuccessFilms,
    } = useGetFilmsQuery({ filter: 'now_playing', page: 1 })

    const {
        data: genres,
        isLoading: isLoadingGenres,
        isSuccess: isSuccessGenres,
    } = useGetGenresQuery()

    if (isLoadingFilms || isLoadingGenres) {
        return <div style={{ height: '50vh', width: '100%', background: 'var(--black)', position: 'relative'}}><Spinner /></div>
    }

    const swiperSlides = (isSuccessFilms && isSuccessGenres) && films.results.slice(0, 4).map((film) => {
            return (
                <SwiperSlide key={film.id}>
                    <div className="slide">
                        <FilmBackdrop backdropPath={film.backdrop_path} />
                        <div className="slide__content">
                            <h2 className="slide__title">{film.title}</h2>
                            <div className="slide__info">
                                <span className="slide__rating">{convertToFiveStarRating(film.vote_average)}</span>
                                <div className="slide__genre">
                                     {film.genre_ids.map(id => genres.genres.find(genre => genre.id === id)?.name).join(' | ')}
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
                pagination={{
                    clickable: true,
                    clickableClass: 'swiperPagination',
                    bulletClass: 'paginationBullet',
                    bulletActiveClass: 'paginationActiveBullet'
                }}
                modules={[Pagination]}
                className="slider"
            >
                {swiperSlides}
            </Swiper>
    );
})

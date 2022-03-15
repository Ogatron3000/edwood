import {Swiper, SwiperSlide} from "swiper/react";
import SliderButton from "../SliderButton/SliderButton";
import FilmCard from "../FilmCard/FilmCard";
import './SimilarFilms.css';
import 'swiper/css';
import "swiper/css/pagination";

export default function SimilarFilms({ films }) {
    return (
        <div className="similar container">
            <Swiper
                slidesPerView={4}
                slidesPerGroup={4}
                loop={true}
                spaceBetween={6}
                breakpoints={{
                    768: {
                        slidesPerView: 6,
                        slidesPerGroup: 6,
                        spaceBetween: 12,
                    },
                    1024: {
                        slidesPerView: 8,
                        slidesPerGroup: 8,
                        spaceBetween: 12,
                    },
                }}
                style={{display: 'flex', flexDirection: 'column'}}
            >
                <div className="similar__top">
                    <h2 className="similar__title">Similar Films</h2>
                    <div className="similar__controls">
                        <SliderButton direction="prev"/>
                        <SliderButton direction="next"/>
                    </div>
                </div>
                {films.map(film => <SwiperSlide key={film.id}><FilmCard film={film} /></SwiperSlide>)}
            </Swiper>
        </div>
    )
}

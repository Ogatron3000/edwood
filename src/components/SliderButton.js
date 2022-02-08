import {useSwiper} from 'swiper/react';
import './SliderButton.css';

export default function SliderButton({direction}) {
    const swiper = useSwiper();

    let icon;
    let positionClass;

    if (direction === "next") {
        icon =
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        positionClass = 'right';
    } else {
        icon =
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        positionClass = 'left';
    }

    return (
        <button className={`slider-btn ${positionClass}`}
                onClick={() => direction === "next" ? swiper.slideNext() : swiper.slidePrev()}>
            {icon}
        </button>
    );
}
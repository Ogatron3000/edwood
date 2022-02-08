import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import "swiper/css/pagination";
import './Slider.css';
import SliderButton from "./SliderButton";
import {Pagination} from "swiper";

export default function Slider() {
    const pagination = {
        clickable: true
    }

    return (
            <Swiper
                slidesPerView={1}
                loop={true}
                autoHeight={true}
                pagination={pagination}
                modules={[Pagination]}
                className="slider"
            >
                <SwiperSlide>
                    <div className="slide">
                        <img className="slide__img" src="https://a.ltrbxd.com/resized/sm/upload/xr/9v/ho/1w/power-of-dog-1200-1200-675-675-crop-000000.jpg?k=7f56700819" alt=""/>
                        <div className="slide__content">
                            <h2 className="slide__title">The Power Of The Dog</h2>
                            <div className="slide__info">
                                <span className="slide__rating">3.7</span>
                                <div className="slide__genre">
                                    Action | Drama | Thriller
                                </div>
                            </div>
                            <p className="slide__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consequuntur delectus dolor dolore eveniet expedita facere illo illum iste minus nisi non quae quas qui quisquam sequi sint tempore, velit!</p>
                            <div className="slide__buttons">
                                <button className="button button-primary">Trailer</button>
                                <button className="button button-secondary">Details</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide">
                        <img className="slide__img" src="https://a.ltrbxd.com/resized/sm/upload/fr/5h/tc/zw/licorice-1200-1200-675-675-crop-000000.jpg?k=17bc85e032" alt=""/>
                        <div className="slide__content">
                            <h2 className="slide__title">Licorice Pizza</h2>
                            <div className="slide__info">
                                <span className="slide__rating">3.7</span>
                                <div className="slide__genre">
                                    Action | Drama | Thriller
                                </div>
                            </div>
                            <p className="slide__desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet animi beatae cupiditate dolorem dolorum excepturi fuga illo, maxime odit quo rem repellat reprehenderit sapiente, sed sequi, similique tempora ut vero.</p>
                            <div className="slide__buttons">
                                <button className="button button-primary">Trailer</button>
                                <button className="button button-secondary">Details</button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/*<SliderButton direction="prev"/>*/}
                {/*<SliderButton direction="next"/>*/}
            </Swiper>
    );
};

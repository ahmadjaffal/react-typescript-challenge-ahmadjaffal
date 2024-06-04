import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import sliderImage1 from '../../assets/images/main-slider/01.png'
import sliderImage2 from '../../assets/images/main-slider/02.png'
import sliderImage3 from '../../assets/images/main-slider/03.png'

const Slider: React.FC = () => {
    return (
        <Swiper spaceBetween={25} slidesPerView={1}>
            <SwiperSlide>
                <div className="w-full  bg-gray-100 rounded-lg mb-8">
                    <img src={sliderImage1} className="w-full aspect-video rounded-lg" alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full  bg-gray-100 rounded-lg mb-8">
                    <img src={sliderImage2} className="w-full aspect-video rounded-lg" alt="" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="w-full  bg-gray-100 rounded-lg mb-8">
                    <img src={sliderImage3} className="w-full aspect-video rounded-lg" alt="" />
                </div>
            </SwiperSlide>
        </Swiper>
    );
}

export default Slider;
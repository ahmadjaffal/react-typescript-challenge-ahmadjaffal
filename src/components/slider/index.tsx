import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import './slider.scss'
import sliderImage1 from '../../assets/images/main-slider/01.png'
import sliderImage2 from '../../assets/images/main-slider/02.png'
import sliderImage3 from '../../assets/images/main-slider/03.png'

const Slider: React.FC = () => {

    const sliderImages = [
        sliderImage1,
        sliderImage2,
        sliderImage3
    ]

    return (
        <Swiper
            spaceBetween={10}
            slidesPerView={1}
            loop={true}
            navigation={true}
            pagination={{
                dynamicBullets: true,
            }}
            modules={[Pagination, Navigation]}
            className="mb-6">
            {sliderImages?.length ? sliderImages.map((sliderImage, index) => (
                <SwiperSlide>
                    <div className="w-full bg-gray-100 rounded-lg mb-8">
                        <img src={sliderImage} className="w-full aspect-video rounded-lg" alt={`Slider image ${index}`} />
                    </div>
                </SwiperSlide>
            ))
                : <p>No Images To Display</p>}
        </Swiper>
    );
}

export default Slider;
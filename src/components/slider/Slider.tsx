import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import './Slider.scss'
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
                <SwiperSlide key={index} >
                    <div className="w-full bg-gray-100 rounded-lg mb-8 relative">
                        <img src={sliderImage} className="w-full aspect-video rounded-lg" title={`Slider image ${index}`} alt={`Slider image ${index}`} />
                        <div className="bg-black opacity-50 text-white h-18 absolute bottom-0 w-full p-3">
                            <h1 className='text-xl text-secondary'>Amazing Experience Store</h1>
                            <p className='text-sm'>Your store for all your beautiful experiences and ideas</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))
                : <p>No slides to display!</p>}
        </Swiper>
    );
}

export default Slider;
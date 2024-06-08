import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import './Slider.scss';
import sliderImage1 from '../../assets/images/main-slider/01.png';
import sliderImage2 from '../../assets/images/main-slider/02.png';
import sliderImage3 from '../../assets/images/main-slider/03.png';

interface Slide {
    image: string; // slide image
    title: string;  // slide title
    description: string;    // slide description
}

/**
 * Component for displaying a slider with multiple slides.
 */
const Slider: React.FC = () => {
    // Array of slides with image, title, and description
    const slides: Slide[] = [
        {
            image: sliderImage1,
            title: "Amazing Experience Store - Slide 1",
            description: "Your store for all your beautiful experiences and ideas"
        },
        {
            image: sliderImage2,
            title: "Amazing Experience Store - Slide 2",
            description: "Your store for all your beautiful experiences and ideas"
        },
        {
            image: sliderImage3,
            title: "Amazing Experience Store - Slide 3",
            description: "Your store for all your beautiful experiences and ideas"
        },
    ];

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
            className="mb-6"
        >
            {slides?.length ? (
                slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full bg-gray-100 rounded-lg mb-8 relative">
                            <img
                                src={slide?.image}
                                className="w-full aspect-video rounded-lg"
                                title={`Slide image - ${index}`}
                                alt={`Slide image - ${index}`}
                            />
                            <div className="bg-black opacity-50 text-white h-18 absolute bottom-0 w-full p-3">
                                <h1 className='text-xl text-secondary'>{slide?.title}</h1>
                                <p className='text-sm'>{slide?.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))
            ) : (
                <p>No slides to display!</p>
            )}
        </Swiper>
    );
};

export default Slider;

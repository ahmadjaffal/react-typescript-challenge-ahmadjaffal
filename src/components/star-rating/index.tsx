import React from 'react';

interface Props {
    rate: number;
}

const StarRating: React.FC<Props> = ({ rate }) => {
    const MAX_STARS = 5;
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = MAX_STARS - fullStars - halfStar;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i className='sicon-star2 text-yellow-300'></i>);
    }
    if (halfStar === 1) {
        stars.push(<i className='sicon-star-o text-yellow-300'></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i key={`${i + fullStars + 1}`} className='sicon-star-o text-gray-300'></i>);
    }

    return (
        <div className='flex items-center justify-center flex-wrap gap-2 text-gray-300 w-full'>
            {stars}
        </div>
    );
};

export default StarRating;

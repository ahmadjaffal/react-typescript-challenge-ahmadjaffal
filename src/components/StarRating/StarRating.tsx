import React from 'react';

interface StarRatingProps {
    rate: number | undefined;  // Rating value (between 0 to 5)
    isDetails: boolean;  // Indicates if the star rating is shown in details view
}

/**
 * Component for displaying a star rating based on a numeric rate.
 */
const StarRating: React.FC<StarRatingProps> = ({ rate = null, isDetails = false }) => {
    const MAX_STARS = 5;  // Maximum number of stars

    // Calculate number of full stars, half star, and empty stars based on rate
    const fullStars = Math.floor(Number(rate));
    const halfStar = Number(rate) - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = MAX_STARS - fullStars - halfStar;

    // Array to store star elements based on rating
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<i className='sicon-star2 text-yellow-300' key={i}></i>);
    }
    if (halfStar === 1) {
        stars.push(<i className='sicon-star-o text-yellow-300' key={"half-star"}></i>);
    }
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<i key={`${i + fullStars + 1}`} className='sicon-star-o text-gray-300'></i>);
    }

    // Determine the justification of stars based on isDetails prop
    const justifyStyle = isDetails ? `justify-left` : `justify-center`;

    return (
        <div className={`flex items-center flex-wrap gap-2 text-gray-300 w-full ${justifyStyle}`} title={`${rate?.toString()} Stars`}>
            {stars}
        </div>
    );
};

export default StarRating;

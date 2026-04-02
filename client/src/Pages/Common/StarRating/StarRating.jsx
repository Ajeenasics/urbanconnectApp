import React from 'react'

function StarRating({rating}) {
    const stars = [];

    for (let i = 0; i < rating; i++) {
        stars.push(<span style={{fontSize:'1rem'}} key={i}>⭐</span>); // Directly using the emoji
    }

    return <div>{stars}</div>;
}

export default StarRating

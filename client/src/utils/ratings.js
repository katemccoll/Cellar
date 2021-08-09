const MAX_STARS = 5;

export function getStarsForRating(rating) {
    return rating > 0 && rating <= MAX_STARS ? Math.floor(MAX_STARS * rating) : 0;
}

export function getStarRatingString(rating) {
    const numberStars = getStarsForRating(rating);
    return numberStars > 0 ? '★'.repeat(numberStars) : '-';
}
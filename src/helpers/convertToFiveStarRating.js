export default function convertToFiveStarRating(rating) {
    const num = parseFloat(rating);
    if (isNaN(num)) {
        return 0;
    }
    return Math.round(num / 2 * 10) / 10;
}

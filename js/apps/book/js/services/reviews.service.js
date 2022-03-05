import { utilService } from "../../../../services/util.service.js";
import { storageService } from "../../../../services/async-storage.service.js";

const REVIEWS_KEY = 'reviews';

export const reviewService = {
    get,
    addReview,
    removeReview
}

function get(bookId) {
    return storageService.query(REVIEWS_KEY, { bookId });
}

function addReview(bookId, review) {
    review.bookId = bookId;
    review.id = utilService.makeId();
    return storageService.post(REVIEWS_KEY, review);
}

function removeReview(reviewId) {
    storageService.remove(REVIEWS_KEY, reviewId).then(res => console.log('lala'));
}


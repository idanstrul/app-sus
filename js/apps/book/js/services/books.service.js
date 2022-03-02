import { utilService } from "./util.service.js";
import { storageService } from "./async-storage.service.js";
import { bookDataService } from "./books-data.service.js";

const BOOKS_KEY = 'books';

_createBooks();


export const bookService = {
    query,
    get,
    save,
    addReview,
    removeReview
}

function query() {
    return storageService.query(BOOKS_KEY);
}

function get(bookId) {
    return storageService.get(BOOKS_KEY, bookId);
}

function save(book) {
    if (book.id) return storageService.put(BOOKS_KEY, book);
    else return storageService.post(BOOKS_KEY, book);
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOKS_KEY);
    if (!books || !books.length) {
        books = [];
        books.push(...bookDataService);
        utilService.saveToStorage(BOOKS_KEY, books);
    }
    return books;
}

function addReview(bookId, review) {
    return get(bookId).then(book => {
        review.id = utilService.makeId();
        if (!Array.isArray(book.reviews)) book.reviews = [];
        book.reviews.push(review);
        return storageService.put(BOOKS_KEY, book);
    })
}

function removeReview(book, reviewId) {
    const idx = book.reviews.findIndex(review => review.id === reviewId)
    book.reviews.splice(idx, 1)
    return storageService.put(BOOKS_KEY, book)
}

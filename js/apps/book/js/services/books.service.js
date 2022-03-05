import { utilService } from "../../../../services/util.service.js";
import { storageService } from "../../../../services/async-storage.service.js";
import { bookDataService } from "../services/books-data.service.js";

const BOOKS_KEY = 'books';


_createBooks();


export const bookService = {
    query,
    get,
    save,
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



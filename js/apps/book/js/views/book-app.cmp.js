import { bookService } from "../services/books.service.js";
import bookFilter from "../cmps/book-filter.cmp.js";
import bookList from "../cmps/book-list.cmp.js";
import bookDetails from "./book-details.cmp.js";

export default {
    template: `
    <section class="book-app">
        <book-filter @filtered="setFilter" v-if="!selectedBook"></book-filter>
        <book-list  v-if="!selectedBook" :books="booksToShow"></book-list>
        <router-view />   
    </section>
    `,
    components: {
        bookService,
        bookFilter,
        bookList,
        bookDetails,
    },
    data() {
        return {
            books: [],
            selectedBook: null,
            filterBy: null
        }
    },
    methods: {
        selectBook(book) {
            this.selectedBook = book;
        },
        setFilter(filterBy) {
            this.filterBy = filterBy;
        }
    },
    created() {
        bookService.query()
            .then(books => this.books = books);
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.title, 'i');
            const filteredBooks = this.books.filter(book => {
                return regex.test(book.title) && (this.filterBy.maxPrice >= book.listPrice.amount && this.filterBy.minPrice <= book.listPrice.amount)
            });
            console.log('filteredBooks', filteredBooks);
            return filteredBooks
        }
    }
}
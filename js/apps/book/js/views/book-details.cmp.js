import { bookService } from "../services/books.service.js";
import descriptionText from "../cmps/description-text.cmp.js";
import reviewAdd from "../cmps/review-add.cmp.js";
import bookReview from "./book-review.cmp.js";
export default {
    template: `
        <section class="book-details" v-if="book && !isAddReview">
            <img :src=bookImgUrl alt="">
           <h4>Book details</h4>
           <button @click="isAddReview = !isAddReview">Add a review</button> 
            <p>ID: {{book.id}}</p>
            <p>Title: {{book.title}}</p>
            <p>Subtitle: {{book.subtitle}}</p>
            <p>Author: {{authorsForShow}}</p>
            <p>Published Year: {{showPublishedDate}}</p>
           <description-text :txt="book.description"/>
           <p>Pages: {{displayPageCount}}</p>
           <p>Categories: {{displayCategories}}</p>
           <router-link :to="$route.params.bookId+'/review'">Book Reviews</router-link>
            <p :class="displayPriceColor">Price: {{showCurrencyIcon}}</p>
            <p v-if="book.listPrice.isOnSale" class="sale">On Sale!</p>
            <button @click="$router.push('/book')">X</button>
        </section>
            <review-add class="review" v-else-if="isAddReview" :bookId="book.id"></review-add>
        
    `,
    components: {
        descriptionText,
        reviewAdd,
        bookReview
    },
    created() {
        const { bookId } = this.$route.params;
        bookService.get(bookId)
            .then(book => this.book = book);
    },
    data() {
        return {
            book: null,
            isAddReview: false,

        }
    },
    computed: {
        displayPriceColor() {
            const { amount } = this.book.listPrice
            if (amount > 150) return 'red';
            if (amount < 20) return 'green';
        },
        showCurrencyIcon() {
            const { amount, currencyCode } = this.book.listPrice
            if (currencyCode === 'ILS') {
                return '₪' + amount
            } else if (currencyCode === 'USD') {
                return '$' + amount
            } else {
                return '€' + amount
            }
        },
        bookImgUrl() {
            return this.book.thumbnail;
        },
        authorsForShow() {
            return this.book.authors.join('');
        },
        showPublishedDate() {
            let date = new Date().getFullYear();
            let value = '';
            let calcYear = date - this.book.publishedDate;
            if (calcYear > 10) value = 'Classical Book';
            if (calcYear < 1) value = 'New!';
            return this.book.publishedDate + ' ' + value;
        },
        displayPageCount() {
            const { pageCount } = this.book
            let txt = pageCount > 500 ? 'Long Reading' : pageCount > 200 ? 'Decent Reading' : 'Light Reading'

            return pageCount + ' pages, ' + txt;
        },
        displayCategories() {
            return this.book.categories.join(', ')
        },
    }

}
import { bookService } from "../services/books.service.js";

export default {
    template: `
    <section class="book-review" >
        <button @click="$router.push('/book')">Back to books</button>
    <p class="review-title">Book Reviews:</p>
        <div v-for="review in reviews" class="review-container" :key="review">
            <span>Comment By: {{review.name}}</span>
            <span>Date: {{review.date}} Rate: {{'💫'.repeat(review.rate)}}</span>
            <span>Description: {{review.desc}}</span>
            <button @click="removeReview">Delete Review</button>
        </div> 
        </section>
        `,
    data() {
        return {
            book: [],
            reviews: []

        }
    },
    created() {
        console.log('hi');
        const { bookId } = this.$route.params;
        bookService.get(bookId)
            .then(book => {
                this.book = book;
                this.reviews = book.reviews
            });
    },
    methods: {
        removeReview() {

        }
    }
}
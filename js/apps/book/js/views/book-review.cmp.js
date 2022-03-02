import { bookService } from "../services/books.service.js";

export default {
    template: `
    <section class="book-review" >
    <p class="review-title">Book Reviews:</p>
    <h1>lala</h1>
        <div v-for="review in reviews" class="review-container" :key="review">
            <p>lala</p>
            <h2>lili</h2>
            <span>Comment By: {{review.name}}</span>
            <span>Date: {{review.date}} Rate: {{'💫'.repeat(review.rate)}}</span>
            <span>Description: {{review.desc}}</span>
            <button @click="removeComment(review.id)">Delete Comment</button>
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
    computed: {

    },
}
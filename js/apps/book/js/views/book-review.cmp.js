import { bookService } from "../services/books.service.js";
import { reviewService } from "../services/reviews.service.js";

export default {
    template: `
    <section class="book-review" >
        <button @click="$router.push('/book')">Back to books</button>
    <p class="review-title">Book Reviews:</p>
        <div v-for="review in reviews" class="review-container" :key="review">
            <span>Comment By: {{review.name}}</span>
            <span>Date: {{review.date}} Rate: {{'💫'.repeat(review.rate)}}</span>
            <span>Description: {{review.desc}}</span>
            <button @click="removeReview(review.id); $router.push('/book')">Delete Review</button>
        </div> 
        </section>
        `,
    data() {
        return {
            book: {},
            reviews: []

        }
    },
    created() {
        reviewService.get(this.bookId)
            .then(reviews => {
                this.reviews = reviews;
            });
    },
    computed: {
        bookId: function () {
            return this.$route.params.bookId;
        }

    },
    methods: {
        removeReview(id) {
            return reviewService.removeReview(id)
        }
    }
}
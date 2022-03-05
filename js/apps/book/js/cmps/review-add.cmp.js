import { bookService } from "../../../book/js/services/books.service.js";
import { eventBus } from "../../../../services/eventBus.service.js";

export default {
    props: ['bookId'],
    template: `
        <section class="review-add">
            <h4>Add a Review</h4>
            <form action="submit" @submit.prevent="save; $router.push('/book')">
                <p>Full name:</p>
                <input type="text" ref="input" @input="displayReview" v-model="review.name">
                <label for="rate">Rate this book:</label>
                <select required name="rate" @change="displayReview" v-model="review.rate" size=1>
                    <option value=1>1</option>
                    <option value=2>2</option>
                    <option value=3>3</option>
                    <option value=4>4</option>
                    <option value=5>5</option>
                </select>
                <label for="date">Pick a date:</label>
                <input type="date" name="date" :value="review.date">
                <textarea name="review" rows="10" cols="30" v-model="review.desc"></textarea>
                <button >Submit</button>
            </form>
            <button @click="$router.push('/book')">X</button>
        </section>
    `,
    data() {
        return {
            review: {
                name: 'Books Reader',
                rate: null,
                date: new Date().toISOString().slice(0, 10),
                desc: 'Rate book here.',
            },
            book: null,
            n: [1, 2, 3, 4, 5]

        }
    },
    created() {
        bookService.get(this.bookId).then(book => this.book = book)
    },
    methods: {
        displayReview() {
            return this.review
        },
        save() {
            console.log('saving review');
            bookService.addReview(this.bookId, { ...this.review })
                .then(book => {
                    this.book = book
                    this.review = {
                        name: 'Books Reader',
                        rate: null,
                        date: new Date().toISOString().slice(0, 10),
                        desc: 'Rate book here.',
                    }
                    eventBus.emit('show-msg', { txt: 'Review Added', type: 'success' })
                })
        },
        removeComment(reviewId) {
            bookService.removeReview(this.book, reviewId)
                .then(book => {
                    this.book = book
                    eventBus.emit('show-msg', { txt: 'Review Removed', type: 'failure' })
                })
        }
    },
    mounted() {
        this.$refs.input.focus()
    }


}
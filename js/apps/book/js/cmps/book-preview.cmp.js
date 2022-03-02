export default {
    props: ['book'],
    template: `
        <section class="book-preview" @click="$router.push('/book/' + this.book.id)">
            <img :src=bookImgUrl alt="">
            <h2>Title: {{book.title}}</h2>
            <p>Price: {{showCurrencyIcon}}{{book.listPrice.amount}}</p>
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {

    },
    computed: {
        showCurrencyIcon() {

            const { currencyCode } = this.book.listPrice
            if (currencyCode === 'ILS') {
                return '₪'
            } else if (currencyCode === 'USD') {
                return '$'
            } else {
                return '€'
            }
        },
        bookImgUrl() {
            return this.book.thumbnail;
        }
    }

}
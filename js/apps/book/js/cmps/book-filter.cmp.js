export default {
    template: `
        <section class="book-filter">
            <label>
            Search
            <span><input @input="setFilter" type="text" v-model="filterBy.title" placeholder="Search title"></span>
            <span><input @input="setFilter" type="number" v-model.number="filterBy.minPrice" placeholder="Search by min number"></span>
            <span><input @input="setFilter" type="number" v-model.number="filterBy.maxPrice" placeholder="Search by max number"></span>
            </label>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                minPrice: 0,
                maxPrice: 300
            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', { ...this.filterBy });
        }
    }
}
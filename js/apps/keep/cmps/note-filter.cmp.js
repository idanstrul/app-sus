export default {
    template: `
    <section class="note-filter">
        <input type="text" v-model="filterBy.search">
    </section>
    `,
    data() {
        return {
            filterBy: {
                search: '',
                type: ''
            }
        }
    },
    methods: {
        debounce(func, timeout = 300) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => { func.apply(this, args); }, timeout);
            };
        },
        setFilter() {
            console.log('Setting Filter!');
            this.$emit('filtered', this.filterBy)
        },
    },
    watch: {
        filterBy: {
            handler() {
                console.log('yeh');
                this.debounce(this.setFilter)
            },
            deep: true
        }
    }
}
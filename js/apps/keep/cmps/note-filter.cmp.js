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
        // debounce2(func, timeout = 300) {
        //     let timer;
        //     return (...args) => {
        //         clearTimeout(timer);
        //         timer = setTimeout(() => { func.apply(this, args); }, timeout);
        //     };
        // },
        debounce(func, wait) {
            let timeout;

            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };

                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        setFilter() {
            console.log('Setting Filter!');
            this.$emit('filtered', { ...this.filterBy })
        },
    },
    watch: {
        filterBy: {
            handler() {
                console.log('yeh');
                this.debounce(this.setFilter, 300)()
            },
            deep: true
        }
    }
}
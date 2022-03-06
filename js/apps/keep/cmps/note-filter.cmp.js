export default {
    template: `
    <section class="note-filter text-center text-large main-border main-shadow clear-children-style main-input-positioning">
        <label class="filter-label" :class="{'hide-label': filterBy.search}">
            <input type="text" v-model="filterBy.search">
            <span class="iconify" data-icon="carbon:search"></span>
        </label>
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
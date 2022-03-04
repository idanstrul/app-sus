export default {
    name: 'email-filter',
    template: `
        <section class="email-filter">
            <label>
                search
                <input type="text" ref="txtInput" v-model="criteria.txt" placeholder="Search text here">
                <select v-model="criteria.isRead">
                    <option :value="undefined">All</option>
                    <option :value="true">Read</option>
                    <option :value="false">Unread</option>
                </select>
            </label>
        </section>
    `,
    data() {
        return {
            criteria: {
                txt: '',
                isRead: undefined,
            }
        }
    },
    mounted() {
        this.$refs.txtInput.focus()
    },
    methods: {

    },
    watch: {
        criteria: {
            handler: function () {
                this.$emit('filterList', this.criteria);
            },
            deep: true
        }
    }
}
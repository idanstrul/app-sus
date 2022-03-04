export default {
    name: 'email-stats',
    props: ['unreadEmails', 'sorting'],
    template: `
        <section class="email-stats">
            <div>Unread Emails: <span>{{ unreadEmails }}</span></div>
            <select v-model="currentSorting" @change="handleSortingChange">
                <option :value="undefined">None</option>
                <option value="date">Date</option>
                <option value="subject">Subject</option>
            </select>
        </section>
    `,
    data() {
        return {
            currentSorting: this.$props.sorting
        }
    },
    methods: {
        handleSortingChange: function () {
            this.$emit('sortingChange', this.currentSorting)
        }
    }
}
import { emailService } from "../services/email.service.js";
import emailFilter from "../cmps/email-filter.cmp.js";
import emailList from "../cmps/email-list.cmp.js";
import emailFolderList from "../cmps/email-folder-list.cmp.js";
import emailCompose from "../cmps/email-compose.cmp.js";
import emailStats from '../cmps/email-stats.cmp.js'

export default {
    name: 'email-app',
    template: `
        <section class="email-app">
            <button @click="addEmailModal = true">Add new Email</button>
            <email-filter @filter-list="handleFilterList" />
            <email-stats :unread-emails="unreadEmails" :sorting="sorting" @sorting-change="handleSortingChange" />
            <email-compose v-if="addEmailModal" @close="addEmailModal = false" @refetch="getEmails" />
            <email-folder-list />
            <email-list :emails="emails"/>
        </section>
    `,
    components: {
        emailFilter,
        emailList,
        emailFolderList,
        emailCompose,
        emailStats
    },
    data() {
        return {
            emails: [],
            criteria: {
                isRead: undefined,
                status: 'inbox'
            },
            sorting: undefined,
            addEmailModal: false
        }
    },
    computed: {
        currentFolder() {
            return this.$route.query.status || this.criteria.status;
        },
        unreadEmails() {
            return this.emails.filter(email => !email.isRead).length;
        }
    },
    methods: {
        getEmails() {
            emailService.query(this.criteria, this.sorting).then(emails => this.emails = emails);
        },
        handleFilterList(payload) {
            this.criteria = payload;
        },
        handleSortingChange(payload) {
            this.sorting = payload;
        },
        handleRefetch() {
            console.log('refetch');
            this.getEmails();
        }
    },
    watch: {
        currentFolder: {
            handler: function () {
                this.criteria.status = this.currentFolder;
            },
            immediate: true
        },
        criteria: {
            handler: function () {
                this.getEmails();
            },
            deep: true,
            immediate: true
        },
        sorting: {
            handler: function () {
                this.getEmails();
            },
            immediate: true
        }
    }

}
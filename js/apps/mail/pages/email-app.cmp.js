import { emailService } from "../services/email.service.js";
import emailFilter from "../cmps/email-filter.cmp.js";
import emailList from "../cmps/email-list.cmp.js";
import emailFolderList from "../cmps/email-folder-list.cmp.js"

export default {
    name: 'email-app',
    template: `
        <section class="email-app">
            <email-filter @filter-list="handleFilterList" />
            <email-folder-list />
            <email-list :emails="emails"/>
        </section>
    `,
    components: {
        emailFilter,
        emailList,
        emailFolderList
    },
    data() {
        return {
            emails: [],
            criteria: {
                isRead: undefined,
                status: 'inbox'
            },
            loggedinUser: {
                email: 'user@appsus.com',
                fullname: 'Mahatma Appsus'
            }
        }
    },
    computed: {
        currentFolder() {
            return this.$route.query.status || this.criteria.status;
        }
    },
    methods: {
        handleFilterList(payload) {
            this.criteria = payload;
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
                console.log('creating', this.emails);
                emailService.query(this.criteria).then(emails => this.emails = emails);
                console.log('created', this.emails);
            },
            deep: true,
            immediate: true
        }
    }

}
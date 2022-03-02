import { emailService } from "../services/email.service.js";
import emailFilter from "../cmps/email-filter.cmp.js";
import emailList from "../cmps/email-list.cmp.js";
import emailFolderList from "../cmps/email-folder-list.cmp.js"

export default {
    name: 'email-app',
    template: `
        <section class="email-app">
            <email-filter />
            <email-folder-list />
            <email-list />
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
                status: '',
                txt: '',
                isRead: false,
                isStared: false,
                labels: []
            }
        }
    },
    created() {
        emailService.query(this.criteria).then(emails => this.emails = emails);
    },
    methods: {
        setFilter(criteria) {
            this.criteria = criteria;
        }
    },

}
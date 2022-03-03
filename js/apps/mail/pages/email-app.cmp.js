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
                isRead: false
            },
            loggedinUser: {
                email: 'user@appsus.com',
                fullname: 'Mahatma Appsus'
            }
        }
    },
    created() {
        console.log('creating', this.emails);
        emailService.query(this.criteria).then(emails => this.emails = emails);
        console.log('created', this.emails);

    },
    methods: {
    }

}
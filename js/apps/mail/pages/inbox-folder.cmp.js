import { emailService } from "../services/email.service.js"

export default {
    template: `
        <section class="inbox-folder">
            <ul>
                <li>{{email}}</li>
            </ul>
        </section>
    `,
    components: {
        emailService
    },
    created() {
        emailService.query(this.criteria).then(emails => this.emails = emails);

    },
    data() {
        return {
            criteria: {
                status: 'inbox'
            },
            emails: []
        }
    },
    methods: {
        setEmailStatus() {
            this.emails.forEach(email => {
                email.status === criteria.status
            });
            return email.status;
        }
    },
    computed: {}

}
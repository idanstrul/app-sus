import { emailService } from "../services/email.service.js"

export default {
    name: 'trash-folder',
    template: `
        <section class="trash-folder">
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
                status: 'trash'
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
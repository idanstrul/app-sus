import { emailService } from "../services/email.service.js"

export default {
    name: 'draft-folder',
    template: `
        <section class="draft-folder">
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
                status: 'draft'
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
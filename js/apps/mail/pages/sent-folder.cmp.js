import { emailService } from "../services/email.service.js"

export default {
    name: 'sent-folder',
    template: `
        <section class="sent-folder">
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
                status: 'sent'
            },
            emails: []
        }
    },
    methods: {
    },
    computed: {}

}
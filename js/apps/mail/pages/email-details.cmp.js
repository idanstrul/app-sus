import { emailService } from "../services/email.service.js";

export default {
    template: `
        <section class="email-details">
            <div class="email-details-container">
                <div class="email-actions">
            <h4>{{email.subject}}</h4>
            <div>
                <span role="button">🗑</span>
                <span role="button"></span>
                <span role="button"></span>
            </div>
            </div>
            <h5>{{email.from}}</h5>
            <pre>{{email.txt}}</pre>
            </div>
        </section>
    `,
    data() {
        return {
            email: null
        }
    },
    created() {
        console.log('email created');
    },
    computed: {
        emailId() {
            return this.$route.params.emailId;
        }
    },
    methods: {
        loadEmail() {
            emailService.get(this.emailId)
                .then(email => this.email = email);
        }
    }
}
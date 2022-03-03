import { emailService } from "../services/email.service.js";
import emailPreview from "./email-preview.cmp.js";

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul v-if="emails.length > 0">
                <li v-for="email in emails" :key="email.id" class="email-preview-container">
                    <email-preview :email="email"></email-preview>
                </li>
            </ul>
            <div v-else>no emails found</div>
        </section>
    `,
    data() {
        return {
            // email: null
        }
    },
    created() {
        const { emailId } = this.$route.params;
        emailService.get(emailId).then(email => this.email = email)
    },

    components: {
        emailPreview,
        emailService
    },
    methods: {}

}
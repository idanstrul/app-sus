import { emailService } from "../services/email.service.js";

export default {
    name: 'email-details',
    template: `
        <section class="email-details" v-if="email">
            <div class="email-details-container">
                <div class="email-actions">
            <h4>{{email.subject}}</h4>
            <div>
                <span role="button">🗑</span>
                <router-link to="/email-list">⮐</router-link>
                <!-- <span role="button"></span> -->
            </div>
            </div>
            <h5>{{email.from}}</h5>
            <pre>{{email.txt}}</pre>
            </div>
        </section>
        <section v-else class="loading">loading...</section>
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
        },
        setFilter(criteria) {
            this.criteria = criteria;
        },
        isUserLoggedIn(loggedinUser) {
            if (loggedinUser) {
                let emails = emails.forEach(email => {
                    if (email.to === loggedinUser.email) {
                        return emails;
                    }
                })
            }
            return emails;
        }

    }
}
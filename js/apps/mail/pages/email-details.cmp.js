import { emailService } from "../services/email.service.js";

export default {
    name: 'email-details',
    template: `
        <section class="email-details" v-if="email">
            <div class="email-details-container">
                <div class="email-actions">
            <h4>{{email.subject}}</h4>
            <div>
                <span role="button" @click="deleteEmail(); $router.push('/email')">🗑</span>
                <button @click="$router.push('/email')">⮐</button>
                <span>{{displayTime}}</span>
            </div>
            </div>
            <pre>{{email.body}}</pre>
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
        const { emailId } = this.$route.params;
        emailService.get(emailId)
            .then(email => this.email = email);
    },
    computed: {
        emailId() {
            return this.$route.params.emailId;
        },
        displayTime() {
            let timestamp = this.email.sentAt;
            let myDate = new Date(timestamp).toLocaleDateString()
            return myDate;
        },
    },
    methods: {
        loadEmail() {
            emailService.get(this.emailId).then(email => this.email = email);
        },
        deleteEmail() {
            emailService.remove(this.emailId).then(email => this.email = email);
        }
        // isUserLoggedIn(loggedinUser) {
        //     if (loggedinUser) {
        //         let emails = emails.forEach(email => {
        //             if (email.to === loggedinUser.email) {
        //                 return emails;
        //             }
        //         })
        //     }
        //     return emails;
        // }

    },
    watch: {
        emailId: {
            handler() {
                this.loadEmail()
            },
            immediate: true,
        }
    }
}
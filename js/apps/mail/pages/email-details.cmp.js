import { emailService } from "../services/email.service.js";

export default {
    name: 'email-details',
    template: `
        <section class="email-details" v-if="email">
            <div class="email-details-container">
                <div class="email-actions">
            <h4>{{email.subject}}</h4>
            <div>
                <span role="button" @click="markEmailAsDeleted">🗑</span>
                <button @click="$router.push({ name: 'email' })">⮐</button>
                <button @click="saveAsNote">Save as note</button>
                <span>{{displayTime}}</span>
            </div>
            </div>
            <pre>{{email.body}}</pre>
            <img v-if="" src="" alt="">
            </div>
        </section>
        <section v-else class="loading">loading...</section>
    `,
    data() {
        return {
            email: null,
        }
    },
    created() {
        emailService.get(this.emailId)
            .then(email => this.email = email);
    },
    mounted() {
        this.markEmailAsRead();
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
        markEmailAsRead() {
            emailService.markEmailAsRead(this.emailId);
        },
        markEmailAsDeleted() {
            emailService.markEmailAsDeleted(this.emailId);
            this.$router.push({ name: 'email' });
        },
        saveAsNote() {
            emailService.saveEmailAsNote(this.email).then(note => { console.log('email noted', note); })
        }
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
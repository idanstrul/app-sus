import { emailService } from "../services/email.service.js";

export default {
    name: 'email-preview',
    prop: ['email'],
    template: `
        <section class="email-preview">
            <div class="email-container">
                <div >
                    <span role="button" @click="isStared = !isStared">☆</span>
                    <div v-bind:style = "style"> 
                        <!-- v-if="isEmailRead" -->
                    <!-- <span>{{this.email.subject}}</span> -->
                    <pre >{{email}}</pre>
                    <!-- <span>{{this.email.sentAt}}</span> -->
                    </div>
                </div>
            </div>
        </section>
    `,
    components: {
        emailService
    },
    created() {
        emailService.query(this.criteria).then(email => { this.email = email });
        console.log('emailId', this.email.id);

    },
    data() {
        return {
            email: {},
            criteria: {
                isRead: false
            },
            style: 'whitesmoke'
        }
    },

    methods: {
        markAsRead() {
            this.criteria.isRead = true;
            this.style = 'white';

        },
        markAsUnRead() {
            this.criteria.isRead = false;
            this.style = 'whitesmoke';
        }
    },
    computed: {
        isEmailRead() {
            (this.criteria.isRead) ? style = 'white' : 'whitesmoke';
        }
    }

}
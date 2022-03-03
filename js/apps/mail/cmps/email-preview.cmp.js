import { emailService } from "../services/email.service.js";

export default {
    prop: ['email'],
    template: `
        <section class="email-preview">
            <div class="email-container">
                <div>
                    <span role="button" @click="isStared = !isStared">☆</span>
                    <div  v-bind:style = "style"> 
                    <!-- v-if="isEmailRead" -->
                    <!-- <span>{{email.subject}}</span> -->
                    <pre>{{email}}</pre>
                    <!-- <span>{{email.sentAt}}</span> -->
                    </div>
                </div>
            </div>
        </section>
    `,
    components: {
        emailService
    },
    data() {
        return {
            style: 'whitesmoke'
        }
    },

    methods: {
        markAsRead(isRead) {
            // this.isRead = true;
            this.style = 'white';

        },
        markAsUnRead(isRead) {
            // this.isRead = false;
            this.style = 'whitesmoke';
        }
    },
    computed: {
        isEmailRead(isRead) {
            // (this.isRead) ? style = 'white' : 'whitesmoke';
        }
    }

}
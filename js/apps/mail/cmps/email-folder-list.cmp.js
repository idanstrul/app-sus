import { emailService } from "../services/email.service.js";

export default {
    template: `
        <section class="email-folder-list">
            <div class="folder-list-container">
                <div>
                    <!-- <router-link to:'/inbox'>Inbox</router-link>
                    <router-link to:'/sent'>Sent</router-link>
                    <router-link to:'/trash'>Trash</router-link>
                    <router-link to:'/draft'>Draft</router-link> -->
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            criteria: {
                status: '',
            }
        }
    },
    methods: {
        setFilter() {
            emailService.query(criteria)
                .then(email => {
                    return this.email = email;
                })
        }
    }
}
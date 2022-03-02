import { emailService } from "../services/email.service.js";

export default {
    template: `
        <section class="email-filter">
            <label>
                search
                <input type="text" @input="setFilter" ref="txtInput" v-model="criteria.txt" placeholder="Search text here">
            </label>
        </section>
    `,
    components: {
        emailService
    },
    data() {
        return {
            criteria: {
                status: '',
                txt: '',
                isRead: false,
                isStared: false,
                labels: []
            }
        }
    },
    mounted() {
        this.$refs.txtInput.focus()
    },
    methods: {
        setFilter() {
            emailService.get(id)
                .then(email => {
                    return this.email.id = emailId;
                })
        }
    }
}
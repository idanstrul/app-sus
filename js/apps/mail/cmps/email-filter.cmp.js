import { emailService } from "../services/email.service.js";

export default {
    template: `
        <section class="email-filter">
            <label>
                search
                <input type="text" @input="setFilter" ref="txtInput" v-model="criteria.txt" placeholder="Search text here">
                <span role="checkbox" @click="setFilter" v-bind:class="{read:isRead}"></span>
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
            emailService.query(criteria)
                .then(email => {
                    return this.email = email;
                })
        }
    }
}
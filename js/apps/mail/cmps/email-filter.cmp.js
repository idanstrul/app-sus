import { emailService } from "../services/email.service.js";

export default {
    name: 'email-filter',
    template: `
        <section class="email-filter">
            <label>
                search
                <input type="text" ref="txtInput" v-model="criteria.txt" placeholder="Search text here">
                <select v-model="criteria.isRead">
                    <option :value="true">Read</option>
                    <option :value="false">Unread</option>
                </select>
            </label>
        </section>
    `,
    components: {
        emailService
    },
    data() {
        return {
            criteria: {
                txt: '',
                isRead: false,
            }
        }
    },
    mounted() {
        this.$refs.txtInput.focus()
    },
    methods: {

    },
    watch: {
        criteria: {
            handler: function () {
                console.log('ran watch');
                this.$emit('filterChange', this.criteria);
            },
            deep: true
        }
    }
}
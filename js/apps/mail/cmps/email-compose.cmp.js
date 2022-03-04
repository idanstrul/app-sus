import { emailService } from "../services/email.service.js";

export default {
    name: 'email-compose',
    emits: ['close'],
    template: `
    <teleport to="#app-portal">
        <div class="portal-bg">
       <section class="email-compose portal-content">
           <button @click="closeEmail">X</button>
           <div class="form-container">
               <form @submit.prevent="createNewEmail">
                   <label for="to">
                       To
                    </label>
                    <input required type="email" name="to" v-model="formData.to">
                    <label for="subject">
                        Subject
                    </label>
                    <input required type="text" name="subject" v-model="formData.subject">
                    <textarea cols="30" rows="10" v-model="formData.body"></textarea>
                    <button type="submit">Send</button>
               </form>
           </div>
       </section>
</div>
</teleport>
    `,
    components: {
        emailService
    },
    data() {
        return {
            formData: {}
        }
    },
    computed: {},
    methods: {
        createNewEmail() {
            this.formData.sentAt = (new Date()).getTime();
            emailService.saveNewEmail(this.formData);
        },
        closeEmail() {
            this.$emit('close');
        }
    }
}
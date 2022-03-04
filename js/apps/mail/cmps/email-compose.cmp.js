import { emailService } from "../services/email.service.js";
import appModal from "../../../cmps/app-modal.cmp.js"

export default {
    name: 'email-compose',
    props: ['email'],
    emits: ['close', 'refetch'],
    template: `
    <app-modal>
        <section class="email-compose">
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
</app-modal>
    `,
    components: {
        emailService,
        appModal
    },
    data() {
        return {
            formData: {
                to: this.$props?.email?.to,
                subject: this.$props.email?.subject,
                body: this.$props.email?.body
            }
        }
    },
    computed: {
        isDraft: function () {
            return !!this.$props.email;
        }
    },
    methods: {
        createNewEmail() {
            this.formData.sentAt = (new Date()).getTime();
            if (this.isDraft) {
                emailService.createEmailFromDraft(this.$props.email.id, this.formData)
            }
            else {
                emailService.saveNewEmail(this.formData);
            }
            this.$emit('refetch');
            this.$emit('close');
        },
        closeEmail() {
            this.formData.sentAt = (new Date()).getTime();
            emailService.saveEmailDraft(this.formData);
            this.$emit('refetch');
            this.$emit('close');
        }
    }
}
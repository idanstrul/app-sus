import emailCompose from "../cmps/email-compose.cmp.js";
import { emailService } from "../services/email.service.js";

export default {
    name: 'draft-preview',
    props: ['draft'],
    emits: ['refetch'],
    components: { emailCompose },
    template: `
        <section class="email-preview">
            <div class="email-container">
                <div @click="editDraftModal = true">
                <email-compose v-if="editDraftModal" :email="draft" @close="editDraftModal = false" @refetch="handleRefetch" />
                    <span role="button" @click="isStared = !isStared" v-bind:class="{'starred': isStared, 'unstarred': !isStared}">☆</span>
                    <div> 
                    <span>{{this.draft.subject}}</span> 
                    <span>{{displayEmailTxt}}</span>
                    <span role="button" @click="isRead = !isRead" v-bind:class="{'white': !isRead, 'gray': isRead}"></span>
                    <span>{{displayTime}}</span>
                </div>
                <hr>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            isLongMode: false,
            isStared: false,
            isRead: false,
            editDraftModal: false
        }
    },
    methods: {
        handleRefetch() {
            this.$emit('refetch');
        }
    },
    computed: {
        displayTime() {
            let timestamp = this.draft.sentAt;
            let myDate = new Date(timestamp).toLocaleDateString()
            return myDate;
        },
        emailBody() {
            return this.$props.draft.body;
        },
        displayEmailTxt() {
            if (!this.isLongMode && this.emailBody?.length > 40) {
                return this.emailBody.slice(0, 10)
            } else {
                return this.emailBody
            }
        },
    }

}
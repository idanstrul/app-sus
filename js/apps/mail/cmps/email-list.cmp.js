import emailPreview from "./email-preview.cmp.js";
import draftPreview from './draft-preview.cmp.js';

export default {
    name: 'email-list',
    props: ['emails'],
    components: { emailPreview, draftPreview },
    template: `
        <section class="email-list">
            <ul v-if="emails.length > 0">
                <li v-for="email in emails" :key="email.id" class="email-preview-container">
                    <draft-preview v-if="email.status == 'drafts'" :draft="email" @refetch="handleRefetch"/>
                    <email-preview v-else :email="email" @refetch="handleRefetch" />
                </li>
            </ul>
            <div v-else>no emails found</div>
        </section>
    `,
    data() {
        return {
        }
    },
    methods: {
        handleRefetch: function () {
            this.$emit('refetch');
        }
    }

}
import emailPreview from "./email-preview.cmp.js"

export default {
    props: ['emails'],
    template: `
        <section class="email-list">
            <ul class="email-preview-container">
                <li v-for="email in emails" :key="email.id"><email-preview :email="email"/></li>
                
            </ul>
        </section>
    `,
    components: {
        emailPreview
    },
    methods: {}

}
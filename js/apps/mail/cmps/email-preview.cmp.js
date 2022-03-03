
export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview">
            <div class="email-container">
                <div >
                    <span role="button" @click="isStared = !isStared">☆</span>
                    <div> 
                    <span>{{this.email.subject}}</span>
                    <pre >{{email.body}}</pre>
                    <span>{{this.email.sentAt}}</span>
                    </div>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
        }
    },

    methods: {
    },
    computed: {
    }

}
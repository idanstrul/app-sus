export default {
    props: ['email'],
    template: `
        <section class="email-preview">
            <div class="email-container">
                <div>
                    <span role="button" @click="isStared = !isStared">☆</span>
                    <div v-if="isEmailRead" v-bind:style = "style">
                    <span>{{email.subject}}</span>
                    <span>{{email.txt}}</span>
                    <span>{{email.date}}</span>
                    </div>
                </div>
            </div>
        </section>
    `,
    data() {
        return {
            isRead: false,
            style: 'whitesmoke'
        }
    },
    methods: {
        markAsRead() {
            this.isRead = true;
            this.style = 'white';

        },
        markAsUnRead() {
            this.isRead = false;
            this.style = 'whitesmoke';
        }
    },
    computed: {
        isEmailRead() {
            (isRead) ? style = 'white' : 'whitesmoke';
        }
    }

}
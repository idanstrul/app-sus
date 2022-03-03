
export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview">
            <div class="email-container">
                <div @click="$router.push('/email/' + this.email.id)">
                    <span role="button" @click="isStared = !isStared" v-bind:class="{'starred': isStared, 'unstarred': !isStared}">☆</span>
                    <div> 
                    <span>{{this.email.subject}}</span> <span>{{displayEmailTxt}}</span>
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
            isRead: false
        }
    },
    methods: {
    },
    computed: {
        displayTime() {
            let timestamp = this.email.sentAt;
            let myDate = new Date(timestamp).toLocaleDateString()
            return myDate;
        },
        displayEmailTxt() {
            if (!this.isLongMode && this.email.body.length > 100) {
                return this.email.body.slice(0, 30)
            } else {
                return this.email.body
            }
        },
    }

}
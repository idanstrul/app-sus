
export default {
    name: 'email-preview',
    props: ['email'],
    template: `
        <section class="email-preview">
            <div class="email-container">
                <span role="button" @click="isStared = !isStared" :class="[isStared ? 'starred': 'unstarred']">☆</span>
                <div @click="$router.push('/email/' + this.email.id)">
                    <div @click="isRead = !isRead" :class="[isRead ? 'white': 'gray']"> 
                    <span>{{this.email.subject}}</span> 
                    
                    <span>{{displayEmailTxt}}</span>
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
        emailBody() {
            return this.$props.email.body;
        },
        displayEmailTxt() {
            if (!this.isLongMode && this.emailBody?.length > 40) {
                return this.emailBody.slice(0, 10)
            } else {
                return this.emailBody
            }
        },
        displayIsRead() {
            if (this.isRead) {
                return this.email.style = 'white';
            } else {
                return this.email.style = 'gray'
            }
        }
    }

}
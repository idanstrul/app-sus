import { router } from './router.js';
import bookHeader from './cmps/book-header.cmp.js';
import bookFooter from './cmps/book-footer.cmp.js';
const options = {
    template: `
        <section>
            <book-header />
            <router-view />
            <book-footer />
       </section>
    
    `,
    components: {
        bookHeader,
        bookFooter
    },
    data() {
        return {}
    },
    methods: {},
    computed: {}
}

const app = Vue.createApp(options);
app.use(router);
app.mount('#app');
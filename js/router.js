import homePage from "./pages/home-page.cmp.js";
import aboutPage from "./pages/about-page.cmp.js";
import bookApp from "./apps/book/js/views/book-app.cmp.js";
import noteIndex from "./apps/keep/pages/note-index.cmp.js";
import emailApp from "./apps/mail/pages/email-app.cmp.js";
import emailDetails from "./apps/mail/pages/email-details.cmp.js";

const routes = [
    {
        path: '/',
        component: homePage,
        name: 'home'
    },
    {
        path: '/about',
        component: aboutPage,
        name: 'about'
    },
    {
        path: '/book',
        component: bookApp,
        name: 'book'
    },
    {
        path: '/note',
        component: noteIndex,
        name: 'note'
    },
    {
        path: '/email',
        component: emailApp,
        name: 'email'
    },
    {
        path: '/email/:emailId',
        component: emailDetails,
        name: 'email-details'
    }




]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});
import bookApp from './views/book-app.cmp.js';
import bookHomePage from './views/book-home-page.cmp.js'
import bookAboutPage from './views/book-about-page.cmp.js';
import bookDetails from './views/book-details.cmp.js';
import bookReview from './views/book-review.cmp.js';

const routes = [
    {
        path: '/',
        component: bookHomePage
    },
    {
        path: '/about',
        component: bookAboutPage
    },
    {
        path: '/book',
        component: bookApp,
        children: [
            {
                path: ':bookId',
                component: bookDetails,

            },

        ]
    },
    {
        path: '/book/:bookId/review',
        component: bookReview
    }



]


export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});
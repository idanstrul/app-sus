import homePage from "./pages/home-page.cmp.js";
import aboutPage from "./pages/about-page.cmp.js";
import bookApp from "./apps/book/js/views/book-app.cmp.js";

const routes = [
    {
        path: '/',
        component: homePage
    },
    {
        path: '/about',
        component: aboutPage
    },
    {
        path: '/book',
        component: bookApp
    },



]

export const router = VueRouter.createRouter({
    routes,
    history: VueRouter.createWebHashHistory()
});
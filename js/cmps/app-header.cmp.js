import appLogo from "./app-logo.cmp.js"

export default {
    name: 'app-header',
    template: `
        <header class="app-header flex space-between align-center">
            <app-logo></app-logo>
            <nav class="nav-bar">
                <router-link to="/">Home</router-link> |
                <router-link to="/book">Miss Book</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link to="/note">Notes</router-link> |
                <router-link to="/email">Emails</router-link>
            </nav>
        </header>
    `,
    components: {
        appLogo
    }

}
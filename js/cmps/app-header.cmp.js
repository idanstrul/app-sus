export default {
    template: `
        <header class="app-header">
            <div class="logo">
                <h3>Appsus</h3>
            </div>
            <nav class="nav-bar">
                <router-link to="/">Home</router-link> |
                <router-link to="/book">Miss Book</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link to="/note">Notes</router-link> |
                <router-link to="/email">Emails</router-link>
            </nav>
        </header>
    `,

}
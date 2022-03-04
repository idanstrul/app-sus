export default {
    name: 'email-folder-list',
    template: `
        <section class="email-folder-list">
            <div class="folder-list-container">
                <div>
                    <button @click="changeFolder('inbox')">Inbox</button>
                    <button @click="changeFolder('sent')">Sent</button>
                    <button @click="changeFolder('trash')">Trash</button>
                    <button @click="changeFolder('drafts')">Drafts</button>
                </div>
            </div>
        </section>
    `,
    computed: {
        currentFolder() {
            return this.$route.query.status || 'inbox';
        }
    },
    methods: {
        changeFolder(folderName) {
            this.$router.push({ name: 'email', query: { status: folderName } })
        }
    },
    watch: {
        criteria: {
            handler: function () {
                this.$emit('filterFolders', this.criteria);
            },
            deep: true
        }
    }
}
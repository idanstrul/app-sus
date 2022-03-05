export default {
    template: `
    <section class="note-create text-center text-large main-border main-shadow clear-children-style main-input-positioning">
        <form @submit.prevent>
            <input type="text" name="noteInput" @click="$emit('editTrigered', 'note-txt')">
            <button @click="$emit('editTrigered', 'note-todos')">List</button>
            <button @click="$emit('editTrigered', 'note-img')">Image</button>
            <button>Scatch</button>
            <button>Video</button>
            <button>Audio</button>
            <button>Map</button>
        </form>
    </section>
    `,
    data(){
        return {
            newNote: {
                id: "n101",
                type: "note-txt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                }
            }
        }
    }
}
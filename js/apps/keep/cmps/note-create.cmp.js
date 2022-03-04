export default {
    template: `
    <section class="note-create">
        <form @submit.prevent>
            <input type="text" name="noteInput" id="">
            <button>List</button>
            <button>Image</button>
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
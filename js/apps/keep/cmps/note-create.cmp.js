export default {
    template: `
    <section class="note-create">
        <form @submit.prevent>
            <input type="text" name="noteInput" id="">
            <button>list</button>
            <button>scatch</button>
            <button>Image</button>
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
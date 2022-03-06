export default {
    template: `
    <section class="note-create text-center text-large main-border main-shadow clear-children-style main-input-positioning">
            <label class="note-creator-label">
                <input type="text" name="noteInput" @click="$emit('editTrigered', 'note-txt')">
            </label>
            <button @click="$emit('editTrigered', 'note-todos')" title="List note">
                <span class="iconify" data-icon="bi:list-check"></span>
            </button>
            <button @click="$emit('editTrigered', 'note-img')" title="Image note">
                <span class="iconify" data-icon="akar-icons:image"></span> 
            </button>
            <button>
                <span class="iconify" data-icon="bx:paint"></span>
            </button>
            <button>
                <span class="iconify" data-icon="akar-icons:video"></span>
            </button>
            <button>
                <span class="iconify" data-icon="ant-design:audio-filled"></span>
            </button>
            <button>
                <span class="iconify" data-icon="akar-icons:map"></span>
            </button>
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
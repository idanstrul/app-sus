import { noteService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus.service.js"
import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"

export default {
    props: ['note'],
    template: `
    <section class="note-preview" :class="markClr">
        <component :is="note.type" :note="note"/>
        <div class="controlls">
            <select name="mark-clr" v-model="markClr">
                <option value="mark-default">default</option>
                <option value="mark-red">red</option>
                <option value="mark-orange">orange</option>
                <option value="mark-yellow">yellow</option>
                <option value="mark-green">green</option>
                <option value="mark-green-blue">green-blue</option>
                <option value="mark-blue">blue</option>
                <option value="mark-dark-blue">dark-blue</option>
                <option value="mark-purple">purple</option>
                <option value="mark-pink">pink</option>
                <option value="mark-brown">brown</option>
                <option value="mark-grey">grey</option>
            </select>
            <button @click="togglePin">Pin</button>
            <button @click="duplicate">Duplicate</button>
            <button @click="remove">Remove</button>
        </div>
    </section>
    `,
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo
    },
    data(){
        return {
            markClr: 'mark-default',
        }
    },
    methods: {
        togglePin(){
            noteService.togglePin(this.note)
        },
        duplicate(){
            noteService.duplicate(this.note)
                .then(newNote => eventBus.emit('noteDuplicated', newNote))
        },
        remove(){
            noteService.remove(this.note.id)
                .then(() => eventBus.emit('noteRemoved', this.note.id))
        }
    }
}
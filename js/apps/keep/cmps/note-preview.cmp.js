import { noteService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus.service.js"
import noteTxt from "./note-txt.cmp.js"
import noteTodos from "./note-todos.cmp.js"
import noteImg from "./note-img.cmp.js"
import noteVideo from "./note-video.cmp.js"
import colorMarker from "./color-marker.cmp.js"
import appModal from "../../../cmps/app-modal.cmp.js"
import noteEdit from "./note-edit.cmp.js"

export default {
    props: ['note'],
    template: `
    <section class="note-preview" :class="this.note.mark">
        <component :is="note.type" :note="note" @done-state-toggled="setDoneState" @click="isEditOn=true"/>
        <div class="controlls">
            <color-marker :note="note" @marker-changed="setMarkClr"></color-marker>
            <button @click="togglePin">Pin</button>
            <button @click="duplicate">Duplicate</button>
            <button @click="remove">Remove</button>
        </div>
        <app-modal v-if="isEditOn">
            <note-edit :note="note" @edit-closed="isEditOn=false"></note-edit>
        </app-modal>
    </section>
    `,
    components: {
        noteTxt,
        noteTodos,
        noteImg,
        noteVideo,
        colorMarker,
        appModal,
        noteEdit
    },
    data(){
        return {
            isEditOn: false
        }
    },
    methods: {
        setMarkClr(markClr){
            console.log('setting marker clr');
            noteService.setMarkClr(this.note, markClr)
                .then(updateNote => eventBus.emit('noteSaved', updateNote))
        },
        setDoneState(ev, idx){
            console.log('ev.target.checked is', ev.target.checked);
            console.log('idx is', idx);
            const updatedNote = {...this.note}
            const todo = updatedNote.info.todos[idx]
            todo.isDone = ev.target.checked;
            this.setDoneAt(todo)
            this.save(updatedNote)
        },
        setDoneAt(todo){
            todo.doneAt = (todo.isDone)? Date.now(): null;
        },
        save(updatedNote){
            noteService.save(updatedNote)
                .then(updatedNote => {
                    eventBus.emit('noteSaved',updatedNote)
                })
        },
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
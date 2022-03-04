import { noteService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus.service.js"
import noteFilter from "../cmps/note-filter.cmp.js"
import noteList from "../cmps/note-list.cmp.js"
import noteCreate from "../cmps/note-create.cmp.js"
import noteEdit from "../cmps/note-edit.cmp.js"
// import appModal from "../../../cmps/app-modal.cmp.js"

export default {
    template: `
    <section class="note-index">
        <!-- <pre>
            notes: {{notes}}
            notesForDisplay: {{notesForDisplay}}
        </pre> -->
        <note-filter @filtered="setFilter"></note-filter>
        <note-edit v-if="isEditOn" @edit-closed="isEditOn=false"></note-edit>
        <note-create v-else @click="isEditOn=true"></note-create>
        
        <h1 v-if="!isFilterOn && !isPinnedNotesEmpty">Pinned:</h1>
        <note-list v-if="!isFilterOn" :notes="pinnedNotes"></note-list>
        <h1 v-if="!isFilterOn && !isPinnedNotesEmpty">Others:</h1>
        <note-list :notes="notesForDisplay"></note-list>
    </section>
    `,
    components: {
        noteFilter,
        noteList,
        noteCreate,
        noteEdit,
        // appModal
    },
    data() {
        return {
            notes: [],
            filterBy: {
                search: '',
                type: ''
            },
            isEditOn: false
        }
    },
    created(){
        noteService.query()
            .then(notes => this.notes = notes);

        this.unsubscribeNoteDuplicated = eventBus.on('noteDuplicated',(newNote) => this.notes.push(newNote));
        this.unsubscribeNoteRemoved = eventBus.on('noteRemoved', (noteId) => {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes.splice(idx, 1)
        })
        this.unsubscribeNoteSaved = eventBus.on('noteSaved', (newNote) => {
            const idx = this.notes.findIndex(note => note.id === newNote.id)
            if (idx === -1) this.notes.push(newNote);
            else this.notes.splice(idx, 1, newNote);
        })
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        checkIfNoteIsFiltered(note) {
            const inType = (!this.filterBy.type) ? true :
                note.type === this.filterBy.type;

            const inSearch = (!this.filterBy.search) ? true :
                Object.values(note.info).some(val =>{
                    if (typeof val !== 'string') return false
                    return val.toLowerCase().includes(this.filterBy.search.toLowerCase());
                })
                
            return inType && inSearch;
        },
    },
    computed: {
        isFilterOn(){
            return !Object.values(this.filterBy).every(criteria => !criteria)
        },
        isPinnedNotesEmpty(){
            return !this.pinnedNotes.length
        },
        notesForDisplay() {
            if (!this.isFilterOn) return this.notes.filter(note => !note.isPinned)
            return this.notes.filter(this.checkIfNoteIsFiltered)
        },
        pinnedNotes(){
            return this.notes.filter(note => note.isPinned)
        }
    },
    unmounted(){
        this.unsubscribeNoteDuplicated()
        this.unsubscribeNoteRemoved()
        this.unsubscribeNoteSaved()
    }
}
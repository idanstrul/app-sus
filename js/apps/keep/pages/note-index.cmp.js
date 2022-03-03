import { noteService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus.service.js"
import noteFilter from "../cmps/note-filter.cmp.js"
import noteList from "../cmps/note-list.cmp.js"
import noteCreate from "../cmps/note-create.cmp.js"

export default {
    template: `
    <section class="note-index">
        <!-- <pre>
            notes: {{notes}}
            notesForDisplay: {{notesForDisplay}}
        </pre> -->
        <note-filter @filtered="setFilter"></note-filter>
        <note-create></note-create>
        
        <h1 v-if="!isFilterOn && !isPinnedNotesEmpty">Pinned:</h1>
        <note-list v-if="!isFilterOn" :notes="pinnedNotes"></note-list>
        <h1 v-if="!isFilterOn && !isPinnedNotesEmpty">Others:</h1>
        <note-list :notes="notesForDisplay"></note-list>
    </section>
    `,
    components: {
        noteFilter,
        noteList,
        noteCreate
    },
    data() {
        return {
            notes: [],
            filterBy: {
                search: '',
                type: ''
            }
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
    }
}
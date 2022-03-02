import { noteService } from "../services/note.service.js"
import noteFilter from "../cmps/note-filter.cmp.js"
import noteList from "../cmps/note-list.cmp.js"
import noteCreate from "../cmps/note-create.cmp.js"

export default {
    template: `
    <section class="note-index">
        <note-filter @filtered="setFilter"></note-filter>
        <note-create></note-create>
        <note-list :notes="pinnedNotes"></note-list>
        <note-list :notes="notesForDisplay" @pinToggled="togglePin"></note-list>
    </section>
    `,
    components: {
        noteFilter,
        noteList,
        noteCreate
    },
    data() {
        return {
            notes: noteService.getNotes(),
            pinnedNotes: [],
            filterBy: {
                search: '',
                type: ''
            }
        }
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
        notesForDisplay() {
            return this.notes.filter(this.checkIfNoteIsFiltered)
        }
    }
}
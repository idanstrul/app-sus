import { noteService } from "../services/note.service.js"
import noteFilter from "../cmps/note-filter.cmp.js"
import noteList from "../cmps/note-list.cmp.js"
import noteCreate from "../cmps/note-create.cmp.js"

export default{
    template: `
    <section class="note-index">
        <note-filter></note-filter>
        <note-create></note-create>
        <note-list :notes="notesForDisplay"></note-list>
    </section>
    `,
    components: {
        noteFilter,
        noteList,
        noteCreate        
    },
    data(){
        return {
            notes: noteService.getNotes()
        }
    },
    computed: {
        notesForDisplay(){
            return this.notes
        }
    }
}
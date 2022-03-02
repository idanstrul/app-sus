import notePreview from "./note-preview.cmp.js"

export default {
    props: ['notes'],
    template: `
    <section class="note-list card-container">
        <note-preview v-for="note in notes" :key="note.id" :note="note" class="card"></note-preview>
        
    </section>
    `,
    components:{
        notePreview
    }
}
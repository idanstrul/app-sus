export default {
    props: ['note'],
    template: `
    <section class="note-txt">
        <h1>{{note.info.title}}</h1>
        <p>{{note.info.txt}}</p>
    </section>
    `
}
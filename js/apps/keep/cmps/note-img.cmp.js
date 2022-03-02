export default {
    props: ['note'],
    template: `
    <section class="note-img">
        <h2>{{note.info.title}}</h2>
        <img :src="note.info.url" :alt="note.info.title">
    </section>
    `
}
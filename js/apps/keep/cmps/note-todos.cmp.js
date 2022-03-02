export default {
    props: ['note'],
    template: `
    <section class="note-todos">
        <h1>{{note.info.label}}</h1>
        <ul>
            <li v-for="todo in note.info.todos">
                <pre>{{todo}}</pre>
            </li>
        </ul>
    </section>
    `
}
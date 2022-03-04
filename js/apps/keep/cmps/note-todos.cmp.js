export default {
    props: ['note'],
    template: `
    <section class="note-todos">
        <h1>{{note.info.title}}</h1>
        <ul>
            <li v-for="(todo, idx) in note.info.todos">
                <label :title="formatDoneAt(todo.doneAt)">
                    <input type="checkbox" :checked="todo.isDone" @change="$emit('doneStateToggled', $event, idx)">
                    <span>{{todo.txt}}</span> 
                </label>
            </li>
        </ul>
    </section>
    `,
    data(){
        return {

        }
    },
    methods: {
        formatDoneAt(timeStamp){
            if (!timeStamp) return null;
            return 'Done at: ' + new Date(timeStamp).toLocaleString()
        }
    }
}
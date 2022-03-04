import { noteService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus.service.js"
import colorMarker from "./color-marker.cmp.js"

export default {
    // props: ['note'],
    template: `
    <section class="note-edit" :class="newNote.mark">
        <input class="title" type="text" v-model="newNote.info.title">
        <textarea v-if="newNote.type === 'note-txt'" class="txt" name="note-txt" cols="30" rows="10" v-model="newNote.info.txt"></textarea>
        <div v-if="newNote.type === 'note-todos'" v-for="(todo, idx) in newNote.info.todos" class="todo">
            <input type="checkbox" @change="setDoneAt(idx)" v-model="newNote.info.todos[idx].isDone">
            <input type="text" v-model="todo.txt">
            <button @click="removeTodo(idx)">X</button>
            {{todo}}
        </div>
        <div v-if="newNote.type === 'note-todos'" class="todo new-todo">
            <input type="checkbox" @change="setDoneAt(newNote.info.todos.length)" v-model="newTodo.isDone" >
            <input type="text" v-model="newTodo.txt">
            <button @click="addTodo">+</button>
        </div>
        <pre>{{newTodo}}</pre>

        <div class="controls">
            <color-marker :note="newNote" @marker-changed="setMarkClr"></color-marker>
            <button @click="save">Save</button>
        </div>
    </section>
    `,
    components: {
        colorMarker
    },
    data(){
        return {
            newNote: (this.note)? {...this.note}: this.createNewNote(),
            newTodo: { txt: '', isDone: false, doneAt: null },
            test: null
        }
    },
    methods: {
        setDoneAt(idx){
            const todos = this.newNote.info.todos
            const todo = (idx === todos.length)? this.newTodo: todos[idx];
            todo.doneAt = (todo.isDone)? Date.now(): null;
        },
        createNewNote(){
            return {
                id: "",
                type: "note-todos",
                isPinned: false,
                mark: 'mark-default',
                info: {
                    title: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", isDone: false, doneAt: null },
                        { txt: "Coding power", isDone: true, doneAt: 187111111 }
                    ]
                }
            }
        },
        removeTodo(idx){
            this.newNote.info.todos.splice(idx, 1)
        },
        addTodo(){
            if (!this.newTodo.txt) return
            this.newNote.info.todos.push(this.newTodo)
            this.newTodo = { txt: '', isDone: false, doneAt: null }
        },
        setMarkClr(markClr){
            this.newNote.mark = markClr;
        },
        save(){
            this.addTodo()
            noteService.save(this.newNote)
                .then(newNote => {
                    eventBus.emit('noteSaved',newNote)
                    this.newNote = this.createNewNote()
                })
        }
    },
    computed: {
        todosIterator(){
            const todos = this.newNote.info.todos
            return (todos.length)? todos: 1;
            // if (todos.length) return todos
            // return 1
        }
    }
}
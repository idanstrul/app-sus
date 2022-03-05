import { noteService } from "../services/note.service.js"
import { eventBus } from "../../../services/eventBus.service.js"
import colorMarker from "./color-marker.cmp.js"

export default {
    props: ['note', 'noteType'],
    emits: ['editClosed'],
    template: `
        <section class="note-edit" :class="newNote.mark">
            <input class="title" type="text" v-model="newNote.info.title">
            <textarea v-if="newNote.type === 'note-txt'" class="txt" name="note-txt" cols="30" rows="10" v-model="newNote.info.txt"></textarea>

            <div v-if="newNote.type === 'note-todos'" v-for="(todo, idx) in newNote.info.todos" class="todo">
                <input type="checkbox" @change="setDoneAt(idx)" v-model="newNote.info.todos[idx].isDone">
                <input type="text" v-model="todo.txt">
                <button @click="removeTodo(idx)">X</button>
            </div>
            <div v-if="newNote.type === 'note-todos'" class="todo new-todo">
                <input type="checkbox" @change="setDoneAt(newNote.info.todos.length)" v-model="newTodo.isDone" >
                <input type="text" v-model="newTodo.txt">
                <button @click="addTodo">+</button>
            </div>

            <div v-if="newNote.type === 'note-img'">
                <!-- <input type="file" accept="image/*,.pdf" @change="setImg"> -->
                <input type="url" v-model="newNote.info.url">
                <img :src="newNote.info.url" alt="No Image found">
            </div>

            <div class="controls">
                <color-marker :note="newNote" @marker-changed="setMarkClr"></color-marker>
                <button @click="$emit('editClosed')">Cancel</button>
                <button @click="save">Save</button>
            </div>
        </section>
        `,
    components: {
        colorMarker
    },
    // created(){
    //     this.newNote = (this.note)? {...this.note}: this.createNewNote();
    // },
    data() {
        return {
            newNote: (this.note)? JSON.parse(JSON.stringify(this.$props.note)): this.createNewNote(),
            newTodo: { txt: '', isDone: false, doneAt: null },
            test: null
        }
    },
    methods: {
        setDoneAt(idx) {
            const todos = this.newNote.info.todos
            const todo = (idx === todos.length) ? this.newTodo : todos[idx];
            todo.doneAt = (todo.isDone) ? Date.now() : null;
        },
        setImg(ev){
            console.log('ev.target.files[0] is:',  ev.target.files[0])
            console.log('ev.target.value is:',  ev.target.value)
        },
        createNewNote() {
            var info;
            switch (this.noteType){
                case 'note-txt':
                    info = {
                        title: '',
                        txt: ''
                    }
                    break;
                case 'note-todos':
                    info = {
                        title: '',
                        todos: []
                    }
                    break;
                case 'note-img':
                    info = {
                        url: "assets/keep/google-dog-search-2014-01.jpg.optimal.jpg",
                        title: ''
                    }
                    break;
            }
            return {
                id: "",
                type: this.noteType,
                isPinned: false,
                mark: 'mark-default',
                info
            }
        },
        removeTodo(idx) {
            this.newNote.info.todos.splice(idx, 1)
        },
        addTodo() {
            if (!this.newTodo.txt) return
            this.newNote.info.todos.push(this.newTodo)
            this.newTodo = { txt: '', isDone: false, doneAt: null }
        },
        setMarkClr(markClr) {
            this.newNote.mark = markClr;
        },
        save() {
            this.addTodo()
            noteService.save(this.newNote)
                .then(newNote => {
                    eventBus.emit('noteSaved', newNote)
                    this.newNote = this.createNewNote()
                    this.$emit('editClosed')
                })
        }
    },
    computed: {
        todosIterator() {
            const todos = this.newNote.info.todos
            return (todos.length) ? todos : 1;
            // if (todos.length) return todos
            // return 1
        }
    }
}
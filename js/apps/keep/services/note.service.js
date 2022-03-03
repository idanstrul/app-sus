
import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

export const noteService = {
    query,
    togglePin,
    save,
    duplicate,
    remove
}

const defaultNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        info: {
            url: "assets/keep/google-dog-search-2014-01.jpg.optimal.jpg",
            title: "Bobi and Me"
        },
        style: {
            backgroundColor: "#00d"
        }
    },
    {
        id: "n103",
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 }
            ]
        }
    }
];

const STORAGE_KEY = 'notesDB'
_createNotes();


function query(){
    return storageService.query(STORAGE_KEY)
}

function get(noteId){
    return storageService.get(STORAGE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId);
}

function duplicate(note){
    const newNote = {...note}
    newNote.id = '';
    newNote.isPinned = false;
    return save(newNote)
}

function save(note) {
    if (note.id) return storageService.put(STORAGE_KEY, note);
    else return storageService.post(STORAGE_KEY, note);
}

function togglePin(note){
    note.isPinned = !note.isPinned
    save(note)
}

function _createNotes(){
    let notes = utilService.loadFromStorage(STORAGE_KEY);
    if (!notes || !notes.length){ 
        utilService.saveToStorage(STORAGE_KEY, defaultNotes)
    }
    return notes;
}
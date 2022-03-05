
import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";
import { emailService } from "../../mail/services/email.service.js";

export const noteService = {
    query,
    togglePin,
    save,
    duplicate,
    remove,
    setMarkClr,
    createEmailAsNote
}

const defaultNotes = [
    {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        mark: 'mark-default',
        info: {
            title: 'hello',
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: "n102",
        type: "note-img",
        isPinned: false,
        mark: 'mark-default',
        info: {
            url: "assets/keep/google-dog-search-2014-01.jpg.optimal.jpg",
            title: "Bobi and Me"
        },
    },
    {
        id: "n103",
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
];

const STORAGE_KEY = 'notesDB'
_createNotes();


function query() {
    return storageService.query(STORAGE_KEY)
}

function get(noteId) {
    return storageService.get(STORAGE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(STORAGE_KEY, noteId);
}

function duplicate(note) {
    const newNote = { ...note }
    newNote.id = '';
    newNote.isPinned = false;
    return save(newNote)
}

function save(note) {
    if (note.id) return storageService.put(STORAGE_KEY, note);
    else return storageService.post(STORAGE_KEY, note);
}

function setMarkClr(note, markClr) {
    note.mark = markClr;
    return save(note);
}

function togglePin(note) {
    note.isPinned = !note.isPinned
    save(note)
}

function _createNotes() {
    let notes = utilService.loadFromStorage(STORAGE_KEY);
    if (!notes || !notes.length) {
        utilService.saveToStorage(STORAGE_KEY, defaultNotes)
    }
    return notes;
}

function createEmailAsNote(email) {
    const formatSentTime = new Date(email.sentAt).toLocaleString()
    const newEmailNote = {
        id: "",
        type: 'note-txt',
        isPinned: false,
        mark: 'mark-default',
        info: {
            title: email.subject,
            txt: `${email.body}
                Email sent to: ${email.to} at ${formatSentTime}
            `
        }
    }
    return save(newEmailNote);
}
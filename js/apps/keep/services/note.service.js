
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
    createEmailAsNote,
    convertNoteToEmail
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


function convertNoteToEmail(note) {
    const formatedNote = formatNoteAsText(note)
    return emailService.saveEmailDraft(formatedNote)
}

function formatNoteAsText(note) {
    switch (note.type) {
        case 'note-txt':
            return {
                subject: note.info.title,
                body: note.info.txt,
                to: '',
            }
        case 'note-todos':
            const todosStrs = note.info.todos.map(todo => {
                const timeFormated = new Date(todo.doneAt).toLocaleString()
                return `◼ ${todo.txt}, ${(todo.isDone) ? '✅ Done at: ' + timeFormated : '❌'}.`
            })
            return {
                subject: note.info.title,
                body: todosStrs.join('\n'),
                to: '',
            }
        case 'note-img':
            return {
                subject: "Bobi and Me",
                url: "assets/keep/google-dog-search-2014-01.jpg.optimal.jpg",
                to: '',
            }

    }
}

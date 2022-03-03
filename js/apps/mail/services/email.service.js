import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js"

const EMAIL_STORAGE_KEY = 'emailsDB';
_createEmails();

export const emailService = {
    query,
    remove,
    get,
    save
};

function query(criteria) {
    let emails = storageService.query(EMAIL_STORAGE_KEY).then(response => {
        console.log('criteria', criteria);
        console.log(response);
        Object.keys(criteria).forEach(criterion => {
            if (criteria[criterion]) {
                response = response.filter(email => email[criterion] === criteria[criterion])
            }
        });
        console.log('response', response);
        return response
    })
    return emails;
}

function remove(emailId) {
    return storageService.remove(EMAIL_STORAGE_KEY, emailId);
}


function get(emailId) {
    return storageService.get(EMAIL_STORAGE_KEY, emailId)
        .then(email => {
            return email = email
        })
}

function save(email) {
    if (email.id) return storageService.put(EMAIL_STORAGE_KEY, email);
    else return storageService.post(EMAIL_STORAGE_KEY, email);
}

function _createEmails() {
    let emails = utilService.loadFromStorage(EMAIL_STORAGE_KEY);
    if (!emails || !emails.length) {
        emails = [];
        emails.push(_createEmail('Miss you!', 'Would love to catch up sometimes', 1551133930594, false, 'momo@momo.com'));
        utilService.saveToStorage(EMAIL_STORAGE_KEY, emails);
    }
    return emails;
}

function _createEmail(subject, body, sentAt, isRead, to) {
    const email = getEmptyEmail(subject, body, sentAt, isRead, to);
    email.id = utilService.makeId();
    return email;
}

function getEmptyEmail(subject = '', body = '', sentAt, isRead, to = '') {
    return {
        id: '',
        subject,
        body,
        sentAt,
        isRead,
        to
    };
}

// const criteria = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: false, // (optional property, if missing: show all)
//     isStared: false, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
// }

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}
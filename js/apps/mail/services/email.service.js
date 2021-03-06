import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";
import { noteService } from "../../keep/services/note.service.js";
const emailsData = [
    {
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        imgs: [],
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'MISSING PERSON!',
        body: 'Where is Puki????',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'WHERE IS MY BAMIA?????',
        body: 'Hi, I opened the fridge and the lunch box with my bamia was not there. any idea where it is?',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Google Maps Platform',
        body: 'Hello, it appears that your account has an unpaid debt. In order to solve the matter, please ask CA to stop using our paid services. Sincerely, Google Team.',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Dropbox',
        body: 'Hello, it appears that your disk space is running out!',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Lorem is very Ipsum.',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'DO YOU WANT TO SAVE A LIFE???',
        body: 'Hello, each year a wild Lidor gives out his credit card and is left with no money left because of the hunters. If you wish to support the wild Lidor habbitat, donate now!',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem Ipsum',
        body: 'Is the lorem really ipsum?',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'YES! THIS IS A LOREM SPAM!',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem Lorem',
        body: 'Lorem is ipsum',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Ipsum Ipsum',
        body: 'Ipsum is also Lorem???',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Can Muki live without Puki????',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Help!',
        body: 'Lorem?',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Lorem Lorem Lorem!',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Lorem Ipsum.',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Lorem Lorem Lorem',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Ipsum',
        body: 'Ipsum Ipsum Ipsum',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Ipsum',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'This is the end of the Lorem Spam!',
        sentAt: 1551133930594,
        to: 'user@appsus.com'
    }

];

const EMAIL_STORAGE_KEY = 'emailsDB';
_createEmails();

export const emailService = {
    query,
    remove,
    get,
    markEmailAsRead,
    markEmailAsDeleted,
    saveNewEmail,
    saveEmailDraft,
    createEmailFromDraft,
    saveEmailAsNote
};

const criterionFilter = {
    txt: (email, value) => {
        const emailBody = email['body']?.toLowerCase();
        const emailSubject = email['subject']?.toLowerCase();
        const search = value.toLowerCase();
        return emailBody?.includes(search) || emailSubject?.includes(search);
    },
    isRead: (email, value) => {
        return email.isRead === value;
    },
    status: (email, value) => {
        return email.status === value;
    }
}

function query(criteria, sorting) {
    let emails = storageService.query(EMAIL_STORAGE_KEY).then(response => {


        Object.keys(criteria).forEach(criterion => {
            if (typeof criteria[criterion] !== 'undefined') {
                response = response.filter(email => criterionFilter[criterion](email, criteria[criterion]));
            }
        });


        if (sorting === 'date') {
            response = response.sort(function (a, b) {
                console.log(b.sentAt)
                return new Date(b.sentAt) - new Date(a.sentAt);
            })
        }

        if (sorting === 'subject') {
            response = response.sort(function (a, b) {
                const textA = a.subject.toUpperCase();
                const textB = b.subject.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
        }

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

function saveNewEmail(emailPayload) {
    const newEmail = getEmptySentEmail(emailPayload);
    storageService.post(EMAIL_STORAGE_KEY, newEmail);
}

function createEmailFromDraft(emailId, emailPayload) {
    get(emailId).then(email => {
        Object.assign(email, emailPayload);
        email.status = 'sent';
        storageService.put(EMAIL_STORAGE_KEY, email)
    });
}


function saveEmailDraft(emailPayload) {
    const emailDraft = getEmptyDraftEmail(emailPayload);
    return storageService.post(EMAIL_STORAGE_KEY, emailDraft);
}

function markEmailAsRead(emailId) {
    get(emailId).then(email => {
        email.isRead = true;
        storageService.put(EMAIL_STORAGE_KEY, email)
    });
}

function markEmailAsDeleted(emailId) {
    get(emailId).then(email => {
        if (email.status == 'trash') {
            storageService.remove(EMAIL_STORAGE_KEY, emailId)
        }
        else {
            email.status = 'trash';
            storageService.put(EMAIL_STORAGE_KEY, email)
        }
    })
}


function saveEmailAsNote(email) {
    return noteService.createEmailAsNote(email);
}


function getEmptyEmail(email) {
    return {
        ...email,
        id: utilService.makeId(),
        isRead: false,
        status: 'inbox',
        isStared: false
    };
}

function getEmptySentEmail(email) {
    return {
        ...email,
        id: utilService.makeId(),
        isRead: false,
        status: 'sent',
        isStared: false,
        sentAt: (new Date()).getTime()
    };
}
function getEmptyDraftEmail(email) {
    return {
        ...email,
        id: utilService.makeId(),
        isRead: false,
        status: 'drafts',
        isStared: false,
        sentAt: (new Date()).getTime()
    };
}



function _createEmail(email) {
    const createdEmail = getEmptyEmail(email);
    return createdEmail;
}

function _createEmails() {
    const foundEmails = utilService.loadFromStorage(EMAIL_STORAGE_KEY);
    if (!foundEmails) {
        const createdEmails = emailsData.map(email => _createEmail(email));
        utilService.saveToStorage(EMAIL_STORAGE_KEY, createdEmails);
    }
}
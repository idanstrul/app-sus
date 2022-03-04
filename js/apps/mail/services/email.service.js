import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/async-storage.service.js";

const emailsData = [
    {
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        sentAt: 1551133930594,
        isRead: false,
        to: 'momo@momo.com'
    },
    {
        subject: 'MISSING PERSON!',
        body: 'Where is Puki????',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'WHERE IS MY BAMIA?????',
        body: 'Hi, I opened the fridge and the lunch box with my bamia was not there. any idea where it is?',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Google Maps Platform',
        body: 'Hello, it appears that your account has an unpaid debt. In order to solve the matter, please ask CA to stop using our paid services. Sincerely, Google Team.',
        sentAt: 1551133930594,
        isRead: true,
        to: 'user@appsus.com'
    },
    {
        subject: 'Dropbox',
        body: 'Hello, it appears that your disk space is running out!',
        sentAt: 1551133930594,
        isRead: true,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Lorem is very Ipsum.',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'DO YOU WANT TO SAVE A LIFE???',
        body: 'Hello, each year a wild Lidor gives out his credit card and is left with no money left because of the hunters. If you wish to support the wild Lidor habbitat, donate now!',
        sentAt: 1551133930594,
        isReal: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem Ipsum',
        body: 'Is the lorem really ipsum?',
        sentAt: 1551133930594,
        isReal: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'YES! THIS IS A LOREM SPAM!',
        sentAt: 1551133930594,
        isReal: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem Lorem',
        body: 'Lorem is ipsum',
        sentAt: 1551133930594,
        isReal: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Ipsum Ipsum',
        body: 'Ipsum is also Lorem???',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Can Muki live without Puki????',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Help!',
        body: 'Lorem?',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Lorem Lorem Lorem!',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Lorem Ipsum.',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Lorem Lorem Lorem',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Ipsum',
        body: 'Ipsum Ipsum Ipsum',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'Ipsum',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    },
    {
        subject: 'Lorem',
        body: 'This is the end of the Lorem Spam!',
        sentAt: 1551133930594,
        isRead: false,
        to: 'user@appsus.com'
    }

];

const EMAIL_STORAGE_KEY = 'emailsDB';
_createEmails();

export const emailService = {
    query,
    remove,
    get,
    save
};

const criterionFilter = {
    txt: (email, value) => {
        const emailBody = email['body'].toLowerCase();
        const emailSubject = email['subject'].toLowerCase();
        const search = value.toLowerCase();
        return emailBody.includes(search) || emailSubject.includes(search);
    },
    isRead: (email, value) => {
        return email.isRead === value;
    }
}

function query(criteria) {
    let emails = storageService.query(EMAIL_STORAGE_KEY).then(response => {
        Object.keys(criteria).forEach(criterion => {
            if (criteria[criterion]) {
                response = response.filter(email => criterionFilter[criterion](email, criteria[criterion]));
            }
        });
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





function getEmptyEmail(email) {
    return {
        ...email,
        id: utilService.makeId(),
    };
}

// const criteria = {
//     status: 'inbox/sent/trash/draft',
//     txt: 'puki', // no need to support complex text search
//     isRead: false, // (optional property, if missing: show all)
//     isStared: false, // (optional property, if missing: show all)
//     lables: ['important', 'romantic'] // has any of the labels
// }




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
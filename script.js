let myLibrary = [];

function Book(title, author, totalPages, readingStatus) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readingStatus = readingStatus;
}

myLibrary.push(new Book('The Tell-Tale Heart', 'Edgar Allan Poe', 4, 'Completed'));

myLibrary.push(new Book('The Way Of Kings', 'Brandon Sanderson', 1258, 'In Progress'));

myLibrary.push(new Book('The Name of the Wind', 'Patrick Rothfuss', 722, 'To Be Read'));

myLibrary.push(new Book('Fahrenheit 451', 'Ray Bradbury', 249, 'Completed'));

myLibrary.push(new Book('The Lies of Locke Lamora', 'Scott Lynch', 752, 'To Be Read'));

myLibrary.push (new Book('The Blade Itself', 'Joe Abercrombie', 536, 'To Be Read'));

function addBookToLibrary() {
    const title = document.getElementById("addBookForm").elements["title"].value;
    const author = document.getElementById("addBookForm").elements["author"].value;
    const totalPages = document.getElementById("addBookForm").elements["totalPages"].value;
    const readingStatus = document.getElementById("addBookForm").elements["readingStatus"].value;

    myLibrary.push(new Book(title, author, totalPages, readingStatus));
    document.getElementById("addBookForm").reset();

    refreshLibrary();
    updateReadingStatus();
}

document.getElementById("addBookButton").addEventListener('click', addBookToLibrary);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function refreshLibrary() {
    removeAllChildNodes(document.getElementById('bookContainer'));

    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        titleDiv.textContent = book.title;
        bookDiv.appendChild(titleDiv);

        const authorDiv = document.createElement('div');
        authorDiv.classList.add('author');
        authorDiv.textContent = 'By ' + book.author;
        bookDiv.appendChild(authorDiv);

        const totalPagesDiv = document.createElement('div');
        totalPagesDiv.classList.add('totalPages');
        totalPagesDiv.textContent = 'Pages: ' + book.totalPages;
        bookDiv.appendChild(totalPagesDiv);

        const readingStatusDiv = document.createElement('div');
        readingStatusDiv.classList.add('readingStatus');
        readingStatusDiv.textContent = book.readingStatus;
        bookDiv.appendChild(readingStatusDiv);

        document.getElementById('bookContainer').appendChild(bookDiv);
    })
}

refreshLibrary();

function updateReadingStatusColor() {
    Array.from(document.getElementsByClassName('readingStatus')).forEach((e) => {
        switch (e.textContent) {
            case 'To Be Read':
                e.classList.remove('inProgress');
                e.classList.remove('completed');
                e.classList.add('toBeRead');
                break;
            case 'In Progress':
                e.classList.remove('completed');
                e.classList.remove('toBeRead');
                e.classList.add('inProgress');
                break;
            case 'Completed':
                e.classList.remove('toBeRead');
                e.classList.remove('inProgress');
                e.classList.add('completed');
                break;
        }
    })
}

function changeReadingStatusEventListener() {
    Array.from(document.getElementsByClassName('readingStatus')).forEach((e) => {
        e.addEventListener('click', () => {
            switch (e.textContent) {
                case 'To Be Read':
                    e.textContent = 'In Progress';
                    break;
                case 'In Progress':
                    e.textContent = 'Completed';
                    break;
                case 'Completed':
                    e.textContent = 'To Be Read';
                    break;
            }
            updateReadingStatusColor();
        })
        
    })
}

function updateReadingStatus() {
    changeReadingStatusEventListener();
    updateReadingStatusColor();
}

updateReadingStatus();

scalingFontSize = function (parent, child, boxWidthPercent) {
    Array.from(document.querySelectorAll(parent)).forEach((e) => {
        let fontSize = e.offsetWidth * (boxWidthPercent / 100);
        e.querySelector(child).style.fontSize = fontSize + 'px';
    })
};

scalingFontSize('.book', '.title', 10);
window.addEventListener('resize', () => scalingFontSize('.book', '.title', 10));

scalingFontSize('.book', '.author', 8);
window.addEventListener('resize', () => scalingFontSize('.book', '.author', 8));

scalingFontSize('.book', '.totalPages', 8);
window.addEventListener('resize', () => scalingFontSize('.book', '.totalPages', 8));

scalingFontSize('.book', '.readingStatus', 8);
window.addEventListener('resize', () => scalingFontSize('.book', '.readingStatus', 8));
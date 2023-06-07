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
        bookDiv.setAttribute('data-index', myLibrary.indexOf(book));
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

function readingStatusEventListener() {
    Array.from(document.querySelectorAll('.book')).forEach((e) => {
        e.querySelector('.readingStatus').addEventListener('click', () => {
            switch (myLibrary[e.getAttribute('data-index')].readingStatus) {
                case 'To Be Read':
                    myLibrary[e.getAttribute('data-index')].readingStatus = 'In Progress';
                    e.querySelector('.readingStatus').textContent = myLibrary[e.getAttribute('data-index')].readingStatus;
                    break;
                case 'In Progress':
                    myLibrary[e.getAttribute('data-index')].readingStatus = 'Completed';
                    e.querySelector('.readingStatus').textContent = myLibrary[e.getAttribute('data-index')].readingStatus;
                    break;
                case 'Completed':
                    myLibrary[e.getAttribute('data-index')].readingStatus = 'To Be Read';
                    e.querySelector('.readingStatus').textContent = myLibrary[e.getAttribute('data-index')].readingStatus;
                    break;
            }
            updateReadingStatusColor();
        })
        
    })
}

function updateReadingStatus() {
    readingStatusEventListener();
    updateReadingStatusColor();
}

updateReadingStatus();

scaleFontSize = function (selectorStr, boxWidthPercent) {
    Array.from(document.querySelectorAll(selectorStr)).forEach((e) => {
        e.style.fontSize = (e.offsetWidth * (boxWidthPercent / 100)) + 'px';
    })
};

scalingFontSize = function (selectorStr, boxWidthPercent) {
    scaleFontSize(selectorStr, boxWidthPercent);
    window.addEventListener('resize', () => scaleFontSize(selectorStr, boxWidthPercent));
}

scalingFontSize('.book', 8);
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

function addBookToLibrary() {
    const title = document.getElementById("addBookForm").elements["title"].value;
    const author = document.getElementById("addBookForm").elements["author"].value;
    const totalPages = document.getElementById("addBookForm").elements["totalPages"].value;
    const readingStatus = document.getElementById("addBookForm").elements["readingStatus"].value;

    myLibrary.push(new Book(title, author, totalPages, readingStatus));
    document.getElementById("addBookForm").reset();

    displayBooks();
}

document.getElementById("addBookButton").addEventListener('click', addBookToLibrary);

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayBooks() {
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
        totalPagesDiv.textContent = 'Total Pages: ' + book.totalPages;
        bookDiv.appendChild(totalPagesDiv);

        const readingStatusDiv = document.createElement('div');
        readingStatusDiv.classList.add('readingStatus');
        readingStatusDiv.textContent = book.readingStatus;
        bookDiv.appendChild(readingStatusDiv);

        document.getElementById('bookContainer').appendChild(bookDiv);
    })
}

displayBooks();
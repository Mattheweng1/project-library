// Create a library of books.

let myLibrary = [];

class Book {
  constructor(title, author, totalPages, readingStatus) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;
    this.readingStatus = readingStatus;
  }
}

myLibrary.push(
  new Book("The Tell-Tale Heart", "Edgar Allan Poe", 4, "Completed")
);

myLibrary.push(
  new Book("The Way Of Kings", "Brandon Sanderson", 1258, "In Progress")
);

myLibrary.push(
  new Book("The Name of the Wind", "Patrick Rothfuss", 722, "To Be Read")
);

myLibrary.push(new Book("Fahrenheit 451", "Ray Bradbury", 249, "Completed"));

myLibrary.push(
  new Book("The Lies of Locke Lamora", "Scott Lynch", 752, "To Be Read")
);

myLibrary.push(
  new Book("The Blade Itself", "Joe Abercrombie", 536, "To Be Read")
);

function addBookToLibrary() {
  const title = document.getElementById("addBookForm").elements["title"].value;
  const author =
    document.getElementById("addBookForm").elements["author"].value;
  const totalPages =
    document.getElementById("addBookForm").elements["totalPages"].value;
  const readingStatus =
    document.getElementById("addBookForm").elements["readingStatus"].value;

  myLibrary.push(new Book(title, author, totalPages, readingStatus));
  document.getElementById("addBookForm").reset();

  refreshLibrary();
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function refreshLibrary() {
  removeAllChildNodes(document.getElementById("bookContainer"));

  myLibrary.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("title");
    titleDiv.textContent = book.title;
    bookDiv.appendChild(titleDiv);

    const authorDiv = document.createElement("div");
    authorDiv.classList.add("author");
    authorDiv.textContent = "By " + book.author;
    bookDiv.appendChild(authorDiv);

    const totalPagesDiv = document.createElement("div");
    totalPagesDiv.classList.add("totalPages");
    totalPagesDiv.textContent = "Pages: " + book.totalPages;
    bookDiv.appendChild(totalPagesDiv);

    const readingStatusDiv = document.createElement("div");
    readingStatusDiv.classList.add("readingStatus");
    readingStatusDiv.textContent = book.readingStatus;
    bookDiv.appendChild(readingStatusDiv);

    document.getElementById("bookContainer").appendChild(bookDiv);
    bookDiv.setAttribute("data-index", myLibrary.indexOf(book));
  });

  updateReadingStatus();
  prepareBookContextMenu();
}

refreshLibrary();

function updateReadingStatusColor() {
  Array.from(document.getElementsByClassName("readingStatus")).forEach((e) => {
    switch (e.textContent) {
      case "To Be Read":
        e.classList.remove("inProgress");
        e.classList.remove("completed");
        e.classList.add("toBeRead");
        break;
      case "In Progress":
        e.classList.remove("completed");
        e.classList.remove("toBeRead");
        e.classList.add("inProgress");
        break;
      case "Completed":
        e.classList.remove("toBeRead");
        e.classList.remove("inProgress");
        e.classList.add("completed");
        break;
    }
  });
}

function readingStatusEventListener() {
  Array.from(document.querySelectorAll(".book")).forEach((e) => {
    e.querySelector(".readingStatus").addEventListener("click", () => {
      switch (myLibrary[e.getAttribute("data-index")].readingStatus) {
        case "To Be Read":
          myLibrary[e.getAttribute("data-index")].readingStatus = "In Progress";
          e.querySelector(".readingStatus").textContent =
            myLibrary[e.getAttribute("data-index")].readingStatus;
          break;
        case "In Progress":
          myLibrary[e.getAttribute("data-index")].readingStatus = "Completed";
          e.querySelector(".readingStatus").textContent =
            myLibrary[e.getAttribute("data-index")].readingStatus;
          break;
        case "Completed":
          myLibrary[e.getAttribute("data-index")].readingStatus = "To Be Read";
          e.querySelector(".readingStatus").textContent =
            myLibrary[e.getAttribute("data-index")].readingStatus;
          break;
      }
      updateReadingStatusColor();
    });
  });
}

function updateReadingStatus() {
  readingStatusEventListener();
  updateReadingStatusColor();
}

updateReadingStatus();

// Right click on book to open menu with delete option.

function createBookContextMenu(book) {
  const bookContextMenu = document.createElement("div");
  bookContextMenu.setAttribute("id", "bookContextMenu");
  bookContextMenu.setAttribute("data-index", book.getAttribute("data-index"));

  const bookContextItem1 = document.createElement("div");
  bookContextItem1.classList.add("bookContextItem");
  bookContextItem1.setAttribute("id", "deleteBook");
  bookContextItem1.textContent = "Delete";
  bookContextItem1.addEventListener("click", () => {
    myLibrary.splice(
      document.getElementById("bookContextMenu").getAttribute("data-index"),
      1
    );
    refreshLibrary();
  });
  bookContextMenu.appendChild(bookContextItem1);

  document.getElementById("bookContainer").appendChild(bookContextMenu);
}

function prepareBookContextMenu() {
  Array.from(document.querySelectorAll(".book")).forEach((book) => {
    book.addEventListener("contextmenu", (event) => {
      event.preventDefault();

      if (document.getElementById("bookContextMenu")) {
        bookContextMenu.remove();
      }

      const { pageX: mouseX, pageY: mouseY } = event;

      createBookContextMenu(book);

      bookContextMenu.style.top = `${mouseY}px`;
      bookContextMenu.style.left = `${mouseX}px`;
    });
  });
}

prepareBookContextMenu();

document.addEventListener("click", (event) => {
  if (document.getElementById("bookContextMenu")) {
    if (!bookContextMenu.contains(event.target)) {
      bookContextMenu.remove();
    }
  }
});

document.addEventListener("contextmenu", (event) => {
  const outsideBookClick = Array.from(document.querySelectorAll(".book")).every(
    (e) => {
      return !e.contains(event.target);
    }
  );

  if (document.getElementById("bookContextMenu") && outsideBookClick) {
    event.preventDefault();
    bookContextMenu.remove();
  }
});

// Scale font with element width.

scaleFontSize = function (selectorStr, boxWidthPercent) {
  Array.from(document.querySelectorAll(selectorStr)).forEach((e) => {
    e.style.fontSize = e.offsetWidth * (boxWidthPercent / 100) + "px";
  });
};

scalingFontSize = function (selectorStr, boxWidthPercent) {
  scaleFontSize(selectorStr, boxWidthPercent);
  window.addEventListener("resize", () =>
    scaleFontSize(selectorStr, boxWidthPercent)
  );
};

scalingFontSize(".book", 8);

// Form Validation

const form = document.querySelector("form");

form.noValidate = true;

const errors = form.querySelectorAll(".error");

form.addEventListener("submit", function handleFormSubmit(event) {
  const isValid = form.reportValidity();

  if (!isValid) {
    event.preventDefault();

    for (const field of form.elements) {
      if (field.validationMessage) {
        if (field.getAttribute("type") === "radio") {
          form
            .querySelector(`fieldset.${field.name} .error`)
            .classList.add("flashError");
          setTimeout(() => {
            form
              .querySelector(`fieldset.${field.name} .error`)
              .classList.remove("flashError");
          }, 100);
        } else {
          form
            .querySelector(`label[for=${field.name}]>div>.error`)
            .classList.add("flashError");
          setTimeout(() => {
            form
              .querySelector(`label[for=${field.name}]>div>.error`)
              .classList.remove("flashError");
          }, 100);
        }
      }
    }
  } else {
    addBookToLibrary();
    event.preventDefault();
  }
});

function showError(field) {
  if (Array.isArray(field)) {
    field[0].reportValidity();
    form.querySelector(`fieldset.${field[0].name} .error`).textContent =
      field[0].validationMessage;
  } else {
    field.reportValidity();
    form.querySelector(`label[for=${field.name}]>div>.error`).textContent =
      field.validationMessage;
  }
}

// Set custom validity again after form reset.

form.addEventListener("reset", () => {
  readingStatusRadioArr[0].setCustomValidity(
    "* Please select one of these options."
  );
  for (const field of form.querySelectorAll(".field")) {
    field.setCustomValidity("* Please fill out this field.");
  }
});

// Radio fields have their own validation.

const readingStatusRadioArr = Array.from(
  document.querySelectorAll(`[name='readingStatus']`)
);

if (readingStatusRadioArr.every((e) => !e.checked)) {
  readingStatusRadioArr[0].setCustomValidity(
    "* Please select one of these options."
  );
}

readingStatusRadioArr.forEach((radio) => {
  radio.addEventListener("invalid", (event) => {
    form.querySelector(`fieldset.${radio.name} .error`).textContent =
      radio.validationMessage;
    event.preventDefault();
  });

  radio.addEventListener("change", () => {
    if (readingStatusRadioArr.every((e) => !e.checked)) {
      readingStatusRadioArr[0].setCustomValidity(
        "* Please select one of these options."
      );
    } else {
      readingStatusRadioArr[0].setCustomValidity("");
    }
    showError(readingStatusRadioArr);
  });
});

// Text and tel field validation.

for (const field of form.querySelectorAll(".field")) {
  if (field.validity.valueMissing) {
    field.setCustomValidity("* Please fill out this field.");
  }

  field.addEventListener("invalid", function handleInvalidField(event) {
    form.querySelector(`label[for=${field.name}]>div>.error`).textContent =
      field.validationMessage;
    event.preventDefault();
  });

  field.addEventListener("input", function handleFieldInput(event) {
    validate(field.name);
  });
}

function validate(fieldName) {
  switch (fieldName) {
    case "title":
      validateTitleField();
      break;
    case "author":
      validateAuthorField();
      break;
    case "totalPages":
      validateTotalPagesField();
      break;
  }
}

const titleField = document.querySelector(`[name='title']`);

function validateTitleField() {
  if (titleField.validity.valueMissing) {
    titleField.setCustomValidity("* Please fill out this field.");
  } else {
    titleField.setCustomValidity("");
  }

  showError(titleField);
}

const authorField = document.querySelector(`[name='author']`);

function validateAuthorField() {
  if (authorField.validity.valueMissing) {
    authorField.setCustomValidity("* Please fill out this field.");
  } else {
    authorField.setCustomValidity("");
  }

  showError(authorField);
}

const totalPagesField = document.querySelector(`[name='totalPages']`);

function validateTotalPagesField() {
  if (totalPagesField.validity.valueMissing) {
    totalPagesField.setCustomValidity("* Please fill out this field.");
  } else if (isNaN(totalPagesField.value)) {
    totalPagesField.setCustomValidity("* Please enter a number.");
  } else {
    totalPagesField.setCustomValidity("");
  }

  showError(totalPagesField);
}

/**
 * BASIC COMPONENTS
 */

let LIBRARY = []
const LIBRARY_DISPLAY = document.querySelector(".book-grid");

const updateLibrary = () => {
  console.log("updating")
  LIBRARY_DISPLAY.textContent = '';
  LIBRARY.map(book => {
    LIBRARY_DISPLAY.appendChild(book.htmlElement());
  })
}

document.addEventListener("DOMContentLoaded", () => updateLibrary())


class Book {
  // Book Object
  constructor({ title, author, numOfPages, haveRead }) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
  }

  htmlElement() {
    const bookElementCover = document.createElement("div");
    bookElementCover.classList.add("book")

    const bookElementTitle = document.createElement("h3");
    bookElementTitle.classList.add("book-title");
    bookElementTitle.textContent = this.title;

    const bookElementAuthor = document.createElement("p");
    bookElementAuthor.classList.add("book-author");
    bookElementAuthor.textContent = this.author;

    const pageCountElement = document.createElement("p");
    pageCountElement.classList.add("page-count");
    pageCountElement.textContent = this.numOfPages;

    if (this.haveRead) bookElementCover.classList.add("have-read")

    bookElementCover
      .appendChild(bookElementTitle)
      .parentElement.appendChild(bookElementAuthor)
      .parentElement.appendChild(pageCountElement);

  return bookElementCover;
  }
}

class BookForm {
  bookTitleField = document.querySelector("#book-title");
  bookAuthorField = document.querySelector("#book-author");
  pageCountField = document.querySelector("#page-count");
  checkboxRead = document.querySelector("#have-read");
  btnAddBook = document.querySelector("#submit");

  constructor() {
    this.btnAddBook.addEventListener("click", () => {
      if (!this.validateFields()) return
      const newBook = this.submitBook();
      LIBRARY.push(newBook);
      updateLibrary();
      this.clearFields();
    })
  }

  validateFields() {
    let errorField;
    let isValid = true;

    errorField = this.bookTitleField.parentElement.querySelector(".error-text");
    // Check if user entered a title
    if (this.bookTitleField.value === "") {
      errorField.textContent = "Please enter the book's title."
      isValid = false;
    } else errorField.textContent = "";

    // Check if user entered an author
    errorField = this.bookAuthorField.parentElement.querySelector(".error-text");
    if (this.bookAuthorField.value === "") {
      errorField.textContent = "Who's the author?"
      isValid = false;
    } else errorField.textContent = "";

    // Check if user entered a valid number of pages
    errorField = this.pageCountField.parentElement.querySelector(".error-text");
    if (Number.isNaN(parseInt(this.pageCountField.value)) || parseInt(this.pageCountField.value) < 1) {
      errorField.textContent = "Invalid number of pages."
      isValid = false;
    } else errorField.textContent = "";

    return isValid;
  }

  clearFields() {
    this.bookTitleField.value = '';
    this.bookAuthorField.value = '';
    this.pageCountField.value = '';
    this.checkboxRead.checked = false;
  }

  submitBook() {
    return new Book({
      title      : this.bookTitleField.value,
      author     : this.bookAuthorField.value,
      numOfPages : parseInt(this.pageCountField.value), 
      haveRead   : this.checkboxRead.checked,
    });
  }
}

/** 
 * Double-click to mark book as read.
 */

const BOOK_CHILDREN_CLASSNAMES = ["book-title", "book-author", "page-count"]

LIBRARY_DISPLAY.addEventListener("dblclick", (e) => {
  let book = e.target;

  // Only allows dblclick on book elements.
  if ((book.className !== "book" && book.parentElement.className !== "book") && book.className === "book-grid") return
  else if (BOOK_CHILDREN_CLASSNAMES.includes(book.className)) book = book.parentElement

  book.classList.toggle("have-read");

  // toggle the book toggle in the array
  const bookTitle = book.querySelector(".book-title").textContent
  const bookAuthor = book.querySelector(".book-author").textContent
  const pageCount = parseInt(book.querySelector(".page-count").textContent)
  LIBRARY.map(book => {
    book.title === bookTitle
    && book.author === bookAuthor
    && book.numOfPages === pageCount
    ? book.haveRead = !book.haveRead
    : book
  })
});


/**
 * For demonstration purposes
 */

const thePsychologyOfMoney = new Book({
  title      : "The Psychology of Money",
  author     : "Morgan Housel",
  numOfPages : 256,
  haveRead   : true,
})

LIBRARY.push(thePsychologyOfMoney)

const bookForm = new BookForm()
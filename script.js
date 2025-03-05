/**
 * BASIC COMPONENTS
 */

let LIBRARY = []
const LIBRARY_DISPLAY = document.querySelector(".book-grid");

function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

const updateLibrary = () => {
  console.log("updating")
  LIBRARY_DISPLAY.textContent = '';
  LIBRARY.map(book => {
    const bookElement = createBookElement(book);
    LIBRARY_DISPLAY.appendChild(bookElement);
  })
}

document.addEventListener("DOMContentLoaded", () => updateLibrary())


/**
 * Adding a new book to the list
 */

const bookTitleField = document.querySelector("#book-title");
const bookAuthorField = document.querySelector("#book-author");
const pageCountField = document.querySelector("#page-count");
const checkboxRead = document.querySelector("#have-read");
const btnAddBook = document.querySelector("#submit");

btnAddBook.addEventListener("click", () => {
  if (!validateFields()) return
  const newBook = getNewBook();
  LIBRARY.push(newBook);
  updateLibrary();
  clearFields();
})

const getNewBook = () => {
  return new Book(
    title      = bookTitleField.value,
    author     = bookAuthorField.value,
    numOfPages = parseInt(pageCountField.value), 
    haveRead   = checkboxRead.checked,
  );
}

const createBookElement = (book) => {
  const bookElementCover = document.createElement("div");
  bookElementCover.classList.add("book");

  const bookElementTitle = document.createElement("h3");
  bookElementTitle.classList.add("book-title");
  bookElementTitle.textContent = book.title;

  const bookElementAuthor = document.createElement("p");
  bookElementAuthor.classList.add("book-author");
  bookElementAuthor.textContent = book.author;

  const pageCountElement = document.createElement("p");
  pageCountElement.classList.add("page-count");
  pageCountElement.textContent = book.numOfPages;

  if (book.haveRead) bookElementCover.classList.add("have-read");
  
  bookElementCover
    .appendChild(bookElementTitle)
    .parentElement.appendChild(bookElementAuthor)
    .parentElement.appendChild(pageCountElement);

  return bookElementCover;
}

const validateFields = () => {
  console.log("validation in progress")
  let errorField;
  let isValid = true;

  errorField = bookTitleField.parentElement.querySelector(".error-text");
  if (bookTitleField.value === "") {
    errorField.textContent = "Please enter the book's title."
    isValid = false;
  } else errorField.textContent = "";
  
  errorField = bookAuthorField.parentElement.querySelector(".error-text");
  if (bookAuthorField.value === "") {
    errorField.textContent = "Who's the author?"
    isValid = false;
  } else errorField.textContent = "";
  
  errorField = pageCountField.parentElement.querySelector(".error-text");
  if (Number.isNaN(parseInt(pageCountField.value)) || parseInt(pageCountField.value) < 1) {
    errorField.textContent = "Invalid number of pages."
    isValid = false;
  } else errorField.textContent = "";

  return isValid;
}

const clearFields = () => {
  bookTitleField.value = '';
  bookAuthorField.value = '';
  pageCountField.value = '';
  checkboxRead.checked = false;
}


/** 
 * Double-click to mark book as read.
 */

const BOOK_CHILDREN_CLASSNAMES = ["book-title", "book-author", "page-count"]

LIBRARY_DISPLAY.addEventListener("dblclick", (e) => {
  let book = e.target;
  console.log(book.className)

  // Only allows dblclick on book elements.
  if ((book.className !== "book" && book.parentElement.className !== "book") && book.className === "book-grid") return
  else if (BOOK_CHILDREN_CLASSNAMES.includes(book.className)) book = book.parentElement

  book.classList.toggle("have-read");

  // toggle the book toggle in the array
  const bookTitle = book.querySelector(".book-title").textContent
  const bookAuthor = book.querySelector(".book-author").textContent
  const pageCount = parseInt(book.querySelector(".page-count").textContent)
  console.log("yeah")
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

const thePsychologyOfMoney = new Book(
  title      = "The Psychology of Money",
  author     = "Morgan Housel",
  numOfPages = 256,
  haveRead   = true,
)

LIBRARY.push(thePsychologyOfMoney)
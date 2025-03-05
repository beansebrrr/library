/**
 * LIBRARY
 */
const LIBRARY = document.querySelector(".book-grid");

function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

const boolify = (string) => {
  const YES = ["y", "yes", "true", "t", "on", "1"];
  const NO  = ["n", "no", "false", "f", "off", "0"];

  if (YES.includes(string)) return true;
  else if (NO.includes(string)) return false;
  else return 7008;
}


/**
 * Book submission
 */

const bookTitleField = document.querySelector("#book-title");
const bookAuthorField = document.querySelector("#book-author");
const pageCountField = document.querySelector("#page-count");
const checkboxRead = document.querySelector("#have-read");
const btnAddBook = document.querySelector("#submit");

btnAddBook.addEventListener("click", () => {
  validateFields();
  const newBook = getNewBook();
  createBookElement(newBook);
})

const validateFields = () => {
  console.log("validation in progress")
  let errorField;

  errorField = bookTitleField.parentElement.querySelector(".error-text");
  if (bookTitleField.value === "") {
    errorField.textContent = "Please enter the book's title."
  } else errorField.textContent = "";

  errorField = bookAuthorField.parentElement.querySelector(".error-text");
  if (bookAuthorField.value === "") {
    errorField.textContent = "Who's the author?"
  } else errorField.textContent = "";

  errorField = pageCountField.parentElement.querySelector(".error-text");
  if (Number.isNaN(parseInt(pageCountField.value)) || parseInt(pageCountField.value) < 1) {
    errorField.textContent = "Invalid number of pages."
  } else errorField.textContent = "";
}

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

  const bookElementTitle = document.createElement("h3")
  bookElementTitle.classList.add("book-title");
  bookElementTitle.textContent = bookTitleField.value;

  const bookElementAuthor = document.createElement("p")
  bookElementAuthor.classList.add("book-author");
  bookElementAuthor.textContent = bookAuthorField.value;

  const pageCountElement = document.createElement("p")
  pageCountElement.classList.add("page-count");
  pageCountElement.textContent = pageCountField.value;

  bookElementCover
    .appendChild(bookElementTitle)
    .parentElement.appendChild(bookElementAuthor)
    .parentElement.appendChild(pageCountElement);

  if (checkboxRead.checked) bookElementCover.classList.add("have-read")

  console.log("I'm here now")
  LIBRARY.appendChild(bookElementCover)
}

/**
 * Book Control
 */

const BOOK_CHILDREN_CLASSNAMES = ["book-title", "book-author", "page-count"]

LIBRARY.addEventListener("dblclick", (e) => {
  let book = e.target;
  console.log(book.className)

  // Only allows dblclick on book elements.
  if ((book.className !== "book" && book.parentElement.className !== "book") && book.className === "book-grid") return
  else if (BOOK_CHILDREN_CLASSNAMES.includes(book.className)) book = book.parentElement

  book.classList.toggle("have-read");
});


/**
 * Grid testing
 */

const bookDupes = 0;
const BOOK_ITEM = document.querySelector(".book");

for (let i = 0; i < bookDupes; i++) {
  LIBRARY.appendChild(BOOK_ITEM.cloneNode(true))
}
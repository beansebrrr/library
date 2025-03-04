/**
 * LIBRARY
 */

const LIBRARY = []
const btnAddBook = document.querySelector("#add-new-book");

btnAddBook.addEventListener('click', () => {
  const newBook = promptForNewBook();
  LIBRARY.push(newBook);
  updateTable();
})

function Book(title, author, numOfPages, haveRead) {
  this.title = title;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

const boolify = (string) => {
  const YES = ["y", "yes", "true", "t", "1"];
  const NO  = ["n", "no", "false", "f", "0"];

  if (YES.includes(string)) return true;
  else if (NO.includes(string)) return false;
  else return 7008;
}

/**
 * Book Control
 */

const BOOK_GRID = document.querySelector(".book-grid");
const BOOK_CHILDREN_CLASSNAMES = ["book-title", "book-author", "page-count"]

BOOK_GRID.addEventListener("dblclick", (e) => {
  let book = e.target;
  if ((book.className !== "book" && book.parentElement.className !== "book") && book.className === "book-grid") return
  else if (BOOK_CHILDREN_CLASSNAMES.includes(book.className)) book = book.parentElement

  book.classList.toggle("have-read")
});
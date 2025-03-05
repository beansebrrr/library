/**
 * LIBRARY
 */

const LIBRARY = []

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

  // Only allows dblclick on book elements.
  if ((book.className !== "book" && book.parentElement.className !== "book") && book.className === "book-grid") return
  else if (BOOK_CHILDREN_CLASSNAMES.includes(book.className)) book = book.parentElement

  book.classList.toggle("have-read");
});


/**
 * Grid testing
 */

const bookDupes = 12;
const BOOK_ITEM = document.querySelector(".book");

for (let i = 0; i < bookDupes; i++) {
  BOOK_GRID.appendChild(BOOK_ITEM.cloneNode(true))
}
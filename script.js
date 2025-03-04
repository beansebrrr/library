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

/**
 * LIBRARY
 */

const LIBRARY = []
const bookTableBody = document.querySelector('#book-table>tbody');
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

const updateTable = () => {
  bookTableBody.replaceChildren();
  const tableCell = document.createElement("td")
  
  LIBRARY.forEach(book => {
    const bookEntry = document.createElement("tr");
    Object.keys(book).forEach(property => {
      const propertyCell = tableCell.cloneNode();
      propertyCell.textContent = book[property];
      bookEntry.appendChild(propertyCell);
    })
    bookTableBody.appendChild(bookEntry);
  })
}

const promptForNewBook = () => {
  const title = prompt("What's the title of this book?");
  const author = prompt("Who's the author of this book?");
  let numOfPages, haveRead;

  do {
    numOfPages = parseInt(prompt("How many pages are in book?"));
  } while (Number.isNaN(numOfPages));

  do {
    haveRead = boolify(prompt("Have you read this book?"));
  } while (haveRead !== true && haveRead !== false);

  return new Book(title, author, numOfPages, haveRead);
}

const boolify = (string) => {
  const YES = ["y", "yes", "true", "t", "1"];
  const NO  = ["n", "no", "false", "f", "0"];

  if (YES.includes(string)) return true;
  else if (NO.includes(string)) return false;
  else return 7008;
}
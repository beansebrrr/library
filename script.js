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

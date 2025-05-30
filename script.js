/**
 * BASIC COMPONENTS
 */




class Library {
  arr = []
  constructor(querySelector) {
    this.element = document.querySelector(querySelector)

    this.update()
  }

  update() {
    console.log("balls")
    this.element.textContent = '';
    this.arr.forEach(book => this.element.appendChild(book.htmlElement()))
  }

  addNewBook(book) {
    this.arr.push(book)
    this.update()
  }
}


class Book {
  // Book Object
  constructor({ title, author, numOfPages, haveRead }) {
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
    
    this.bookElementCover = document.createElement("div");
    this.bookElementCover.classList.add("book")
  }
  
  htmlElement() {
    this.bookElementCover.replaceChildren()

    const bookElementTitle = document.createElement("h3");
    bookElementTitle.classList.add("book-title");
    bookElementTitle.textContent = this.title;

    const bookElementAuthor = document.createElement("p");
    bookElementAuthor.classList.add("book-author");
    bookElementAuthor.textContent = this.author;

    const pageCountElement = document.createElement("p");
    pageCountElement.classList.add("page-count");
    pageCountElement.textContent = this.numOfPages;

    if (this.haveRead) this.bookElementCover.classList.add("have-read")

    this.bookElementCover
      .appendChild(bookElementTitle)
      .parentElement.appendChild(bookElementAuthor)
      .parentElement.appendChild(pageCountElement);

    this.bookElementCover.addEventListener("dblclick", () => {
      this.toggleHaveRead()
    })

    return this.bookElementCover;
  }

  toggleHaveRead() {
    console.log("balls")
    this.haveRead = !this.haveRead
    this.bookElementCover.classList.toggle("have-read")
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
      
      library.addNewBook(newBook)
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
 * For demonstration purposes
 */

// const thePsychologyOfMoney = new Book({
//   title      : "The Psychology of Money",
//   author     : "Morgan Housel",
//   numOfPages : 256,
//   haveRead   : true,
// })

// LIBRARY.push(thePsychologyOfMoney)

const library = new Library("section.book-grid")
const bookForm = new BookForm(library)
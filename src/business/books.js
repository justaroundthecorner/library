const BookData = require('../data/books');

class UserBusiness {
  constructor() {
    this.BookData = new BookData();
  }

  // get all books
  async getAllBooks() {
    try {
      const result = await this.BookData.getAllBooks();
      return result;
    } catch (err) {
      throw err;
    }
  }

  //getting one book
  async getOneBook(bookId) {
    try {
      const result = await this.BookData.getOneBook(bookId.id);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //insert a new book
  async insertBook(payload) {
    try {
      const result = await this.BookData.insertBook(payload);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserBusiness;
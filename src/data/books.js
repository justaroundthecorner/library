const Book = require("../Model/index").books;

class BookData {
  async getAllBooks() {
    try {
      //query to get all books
      let result = await Book.query().select("id", "name");
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getOneBook(id) {
    try {
      //geeting one book with its average score
      let result = await Book.query().findById(id);
      if (result) {
        return result;
      } else {
        return {
          message: "This book does not exist",
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async insertBook(payload) {
    try {
      //query to insert a new book
      let result = await Book.query().insert(payload);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = BookData;

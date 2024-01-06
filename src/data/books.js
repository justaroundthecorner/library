
const Book = require('../Model/index').books

class BookData {
  async getAllBooks() {
    try {
    let result= await Book.query().select('id','name')
      return result;
    } catch (err) {
      throw err;
    }
  }
  async getOneBook(id) {
    try {
        console.log(id)
    let result= await Book.query().findById(id)
      return result;
    } catch (err) {
      throw err;
    }
  }
  async insertBook(payload) {
    try {
    let result= await Book.query().insert(payload)
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = BookData;
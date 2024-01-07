const User = require("../Model/index").users;
const Book = require("../Model/index").books;
const BookTransaction = require("../Model/index").book_transaction;

class UserData {
  async getAllUsers() {
    try {
      let result = await User.query();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getOneUser(id) {
    try {
      let result = await BookTransaction.query()
        .withGraphFetched("[user,book]")
        .where("userid", id);
      let user = result[0].user;

      let presentBooks = result
        .filter((a) => a.status === true)
        .flatMap((a) => a.book.map((book) => ({ name: book.name })));
        
      let pastBooks = Array.from(
        new Set(
          result
            .filter((a) => a.status === false)
            .flatMap((a) =>
              a.book.map((book) =>
                JSON.stringify({ name: book.name, score: book.score })
              )
            )
        )
      ).map((item) => JSON.parse(item));

      let res = {
        ...user,
        books: {
          past: [...new Set(pastBooks)],
          present: presentBooks,
        },
      };
      return res;
    } catch (err) {
      throw err;
    }
  }

  async insertUser(payload) {
    try {
      let result = await User.query().insert(payload);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserData;

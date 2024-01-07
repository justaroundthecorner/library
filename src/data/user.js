const User = require("../Model/index").users;
const Book = require("../Model/index").books;
const BookTransaction = require("../Model/index").book_transaction;

class UserData {
  async getAllUsers() {
    try {
      //DB query to get all users
      let result = await User.query();
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getOneUser(id) {
    try {
      //getting user
      let user = await User.query().where("id", id).first();

      //DB call to get transaction history of this user for books
      let result = await BookTransaction.query()
        .withGraphFetched("[user,book]")
        .where("userid", id);

      //filtering present books based on borrow status
      let presentBooks = result
        .filter((a) => a.status === true)
        .flatMap((a) => a.book.map((book) => ({ name: book.name })));

      //filtering past books based on borrow status
      let pastBooks = Array.from(
        new Set(
          result
            .filter((a) => a.status === false)
            .flatMap((a) =>
              a.book.map((book) =>
                JSON.stringify({ name: book.name, score: book.averageScore })
              )
            )
        )
      ).map((item) => JSON.parse(item));

      //merging the response in an object
      let res = {
        ...user,
        books: {
          past: [...new Set(pastBooks)],
          present: presentBooks,
        },
      };

      //checking user existance
      if (user) {
        return res;
      } else {
        return {
          message: "This user does not exist",
        };
      }
    } catch (err) {
      throw err;
    }
  }

  async insertUser(payload) {
    try {
      //query to insert a uer in DB
      let result = await User.query().insert(payload);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserData;

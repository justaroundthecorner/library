const BookTransaction = require("../Model/index").book_transaction;
const Book = require("../Model/index").books;
const { transaction } = require('objection');
var _ = require("lodash");

class BorrowData {
  async borrowBook(userId, bookId) {
    try {
      const currentDate = new Date();
      let result;
      const trx = await transaction.start(BookTransaction.knex());

      let checkBookStatus = await BookTransaction.query(trx)
        .where("bookid", bookId)
        .andWhere("status", true);
      if (checkBookStatus.length == 0) {
        result = await BookTransaction.query(trx).insert({
          userid: userId,
          bookid: bookId,
          status: true,
          borrowdate: currentDate,
        });
        await trx.commit();
        return (result = {
          message: "you have successfully borrowed this book",
        });
      } else {
        return (result = {
          message: "this book is already borrowed",
        });
      }
    } catch (err) {
      await trx.rollback();

      throw err;
    }
  }
  async returnBook(userId, bookId, score) {
    try {
      let payload = {
        status: false,
        returndate: new Date(),
        score: score,
      };
      const trx = await transaction.start(BookTransaction.knex());
      let result = await BookTransaction.query(trx)
        .patch(payload)
        .where("userid", userId)
        .andWhere("bookid", bookId)
        .andWhere("status", true);

      let allScores = await BookTransaction.query(trx)
        .where("bookid", bookId).whereNotNull('score')
        .select("score");
      allScores = allScores.map((a) => a.score);

      let average = _.mean(allScores);

      let bookAverage = await Book.query(trx)     
      .patch({
        averageScore:average.toFixed(2)
      })
      .where("id", bookId)
      await trx.commit();
      if (result) {
        return (result = {
          message: "you have successfully returned this book",
        });
      } else {
        return (result = {
          message: "return unsuccessfull, this book is not borrowed or not in inventory",
        });
      }
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
}
module.exports = BorrowData;

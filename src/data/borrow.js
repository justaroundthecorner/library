const BookTransaction = require("../Model/index").book_transaction;
const Book = require("../Model/index").books;
const { transaction } = require('objection');
var _ = require("lodash");

class BorrowData {

  async borrowBook(userId, bookId) {
    //starting multiple queries with transaction
    const trx = await transaction.start(BookTransaction.knex());
    try {
      const currentDate = new Date();
      let result;

      //checking if the book is available to borrow using the status
      let checkBookStatus = await BookTransaction.query(trx)
        .where("bookid", bookId)
        .andWhere("status", true);

      if (checkBookStatus.length == 0) {
        //if yes enter an entry in transaction table with borrowed status and new date
        result = await BookTransaction.query(trx).insert({
          userid: userId,
          bookid: bookId,
          status: true,
          borrowdate: currentDate,
        });

        //commit the transaction
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

    //start transaction fr multiple queries
    const trx = await transaction.start(BookTransaction.knex());
    try {

      let payload = {
        status: false,
        returndate: new Date(),
        score: score,
      };

      //setting the status of return book and its score by this user, updating return date as well
      let result = await BookTransaction.query(trx)
        .patch(payload)
        .where("userid", userId)
        .andWhere("bookid", bookId)
        .andWhere("status", true);

        //getting all the scores for this book
      let allScores = await BookTransaction.query(trx)
        .where("bookid", bookId).whereNotNull('score')
        .select("score");
      allScores = allScores.map((a) => a.score);

      //getting the average score for this book
      let average = _.mean(allScores);

      //updating the average score of this book
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
          message: "return unsuccessfull, this book/user is not in inventory or has already been returned",
        });
      }
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
}
module.exports = BorrowData;

const { Model } = require('objection');

class Books extends Model {
  static get tableName() {
    return 'books';
  }

  static get idColumn() {
    return 'id';
  }
  static get relationMappings() {
    const BookTransaction = require("./book_transaction");

    return {
      bookTransaction: {
        relation: Model.HasManyRelation,
        modelClass: BookTransaction,
        join: {
          from: "books.id",
          to: "book_transaction.bookid",
        },
      },
}
  }
}
module.exports=Books
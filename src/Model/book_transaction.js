const { Model } = require("objection");

class BookTransaction extends Model {
  static get tableName() {
    return "book_transaction";
  }

  static get idColumn() {
    return "id";
  }

  static get relationMappings() {
    const books = require("./book");
    const users = require("./user");

    return {
      book: {
        relation: Model.HasManyRelation,
        modelClass: books,
        join: {
        from: "book_transaction.bookid",
          to: "books.id",
          
        },
      },

      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: users,
        join: {
          from: "book_transaction.userid",
          to: "users.id",
          
        },
      },
    };
  }
}
module.exports = BookTransaction;

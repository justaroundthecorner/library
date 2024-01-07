const { Model } = require('objection');

class Users extends Model {
  static get tableName() {
    return 'users';
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
          from: "users.id",
          to: "book_transaction.userid",
        },
      },
}
  }
}
module.exports=Users
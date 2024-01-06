const { Model } = require('objection');

class Books extends Model {
  static get tableName() {
    return 'books';
  }

  static get idColumn() {
    return 'id';
  }
}
module.exports=Books
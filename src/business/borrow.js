const BorrowData = require('../data/borrow');

class BorrowBusiness {
  constructor() {
    this.borrowData = new BorrowData();
  }

  // boorow a book by a user
  async borrowBook(params) {
    try {
     const {userId,bookId}=params
      const result = await  this.borrowData.borrowBook(userId,bookId);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //return a book by an user
  async retrunBook(params,body) {
    try {
        const {userId,bookId}=params
        const {score}=body
      const result = await  this.borrowData.returnBook(userId,bookId,score)
      return result;
    } catch (err) {
      throw err;
    }
  }
 
}
module.exports = BorrowBusiness;
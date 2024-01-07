const BorrowData = require('../data/borrow');

class BorrowBusiness {
  constructor() {
    this.borrowData = new BorrowData();
  }

  // get all users
  async borrowBook(params) {
    try {
     const {userId,bookId}=params
      const result = await  this.borrowData.borrowBook(userId,bookId);
      return result;
    } catch (err) {
      throw err;
    }
  }
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
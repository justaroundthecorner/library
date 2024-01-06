const UserData = require('../data/user');

class UserBusiness {
  constructor() {
    this.userData = new UserData();
  }

  // get all users
  async getAllUsers() {
    try {
      const result = await this.userData.getAllUsers();
      return result;
    } catch (err) {
      throw err;
    }
  }
  async insertUser(payload) {
    try {
      const result = await this.userData.insertUser(payload);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserBusiness;
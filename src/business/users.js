const UserData = require('../data/user');

class UserBusiness {
  constructor() {
    this.userData = new UserData();
  }

  // getting all users
  async getAllUsers() {
    try {
      const result = await this.userData.getAllUsers();
      return result;
    } catch (err) {
      throw err;
    }
  }

  //getting single user
  async getOneUser(userId) {
    try {
      const result = await this.userData.getOneUser(userId.id);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //adding a new user
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

const User = require('../Model/index').users

class UserData {
  async getAllUsers() {
    try {
    let result= await User.query()
      return result;
    } catch (err) {
      throw err;
    }
  }

  async insertUser(payload) {
    try {
    let result= await User.query().insert(payload)
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = UserData;
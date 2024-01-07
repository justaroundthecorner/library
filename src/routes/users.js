const express = require("express");
const router = express.Router();
const UserBusiness = require("../business/users");
const schemaValidator = require('../middlewares/schemaValidator');
const schemas = require('../schema');

//creating a route to get all users
router.get("/users", async (req, res) => {
  let result;
  try {
    const userBusiness = new UserBusiness();
    result =await userBusiness.getAllUsers();
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: ` error in retrieving user, detail: ${error}`,
    };
    res.status(400).send(result);
  }
});

//route to get a single user with book transaction history
router.get("/users/:id", async (req, res) => {
  let result;
  try {
    const userBusiness = new UserBusiness();
    result =await userBusiness.getOneUser(req.params);
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: `Error in retreiving user, Detail:${error}`,
    };
    res.status(400).send(result);
  }
});


//route to insert a new user in the system DB
router.post("/users",  [schemaValidator(schemas.user)],async (req, res) => {
    let result;
    try {
      const userBusiness = new UserBusiness();
      result =await userBusiness.insertUser(req.body);
      res.status(200).send(result);
    } catch (error) {
      result = {
        success: false,
        message: `There was an error in inserting this user, Detail:${error}`,
      };
      res.status(400).send(result);
    }
  });
module.exports=router
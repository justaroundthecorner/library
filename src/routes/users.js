const express = require("express");
const router = express.Router();
const UserBusiness = require("../business/users");

router.get("/users", async (req, res) => {
  let result;
  try {
    const userBusiness = new UserBusiness();
    result =await userBusiness.getAllUsers();
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: `${error}`,
    };
    res.status(400).send(result);
  }
});

router.post("/users", async (req, res) => {
    let result;
    try {
      const userBusiness = new UserBusiness();
      result =await userBusiness.insertUser(req.body);
      res.status(200).send(result);
    } catch (error) {
      result = {
        success: false,
        message: `${error}`,
      };
      res.status(400).send(result);
    }
  });
module.exports=router
const express = require("express");
const router = express.Router();
const BorrowBusiness = require("../business/borrow");

//route to borrow a book
router.post("/users/:userId/borrow/:bookId", async (req, res) => {
  let result;
  try {
    const borrowBusiness = new BorrowBusiness();
    result =await borrowBusiness.borrowBook(req.params);
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: `There was an error in borrowing this book, Detail: ${error}`,
    };
    res.status(400).send(result);
  }
});

//route to return a book
router.post("/users/:userId/return/:bookId", async (req, res) => {
  let result;
  try {
    const borrowBusiness = new BorrowBusiness();
    result =await borrowBusiness.retrunBook(req.params,req.body);
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: `There was an error in returning this book. Detail: ${error}`,
    };
    res.status(400).send(result);
  }
});
module.exports=router
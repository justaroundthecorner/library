const express = require("express");
const router = express.Router();
const BookBusiness = require("../business/books.js");
const schemaValidator = require('../middlewares/schemaValidator');
const schemas = require('../schema');

//route to get all books
router.get("/books", async (req, res) => {
  let result;
  try {
    const bookBusiness = new BookBusiness();
    result = await bookBusiness.getAllBooks();
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: `There was an error in retreiving books, Detail: ${error}`,
    };
    res.status(400).send(result);
  }
});

//getting on book with average score
router.get("/books/:id", async (req, res) => {
    let result;
    try {
      const bookBusiness = new BookBusiness();
      result = await bookBusiness.getOneBook(req.params);
      res.status(200).send(result);
    } catch (error) {
      result = {
        success: false,
        message: `There was an error in retreiving book, Detail: ${error}`,
      };
      res.status(400).send(result);
    }
  });

//inserting a new book in th DB
router.post("/books", [schemaValidator(schemas.book)], async (req, res) => {
  let result;
  try {
    const bookBusiness = new BookBusiness();
    result = await bookBusiness.insertBook(req.body);
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: `There was an error in inserting this book, Detail:${error}`,
    };
    res.status(400).send(result);
  }
});
module.exports = router;

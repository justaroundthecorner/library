const express = require("express");
const router = express.Router();
const BookBusiness = require("../business/books.js");

router.get("/books", async (req, res) => {
  let result;
  try {
    const bookBusiness = new BookBusiness();
    result = await bookBusiness.getAllBooks();
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: `${error}`,
    };
    res.status(400).send(result);
  }
});

router.get("/books/:id", async (req, res) => {
    let result;
    try {
      const bookBusiness = new BookBusiness();
      result = await bookBusiness.getOneBook(req.params);
      res.status(200).send(result);
    } catch (error) {
      result = {
        success: false,
        message: `${error}`,
      };
      res.status(400).send(result);
    }
  });
router.post("/books", async (req, res) => {
  let result;
  try {
    const bookBusiness = new BookBusiness();
    result = await bookBusiness.insertBook(req.body);
    res.status(200).send(result);
  } catch (error) {
    result = {
      success: false,
      message: `${error}`,
    };
    res.status(400).send(result);
  }
});
module.exports = router;

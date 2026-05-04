const router = require("express").Router();
const { addBook, getBooks, deleteBook } = require("../controllers/bookController");
const auth = require("../middleware/authMiddleware");

router.post("/add", auth, addBook);
router.get("/all", auth, getBooks);
router.delete("/:id", auth, deleteBook);

module.exports = router;
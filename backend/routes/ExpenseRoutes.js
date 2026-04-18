const router =
require("express").Router();

const auth =
require("../middleware/authMiddleware");

const {
 addExpense,
 getExpenses,
 deleteExpense
} =
require("../controllers/expenseController");

router.post(
 "/add",
 auth,
 addExpense
);

router.get(
 "/all",
 auth,
 getExpenses
);

router.delete(
 "/:id",
 auth,
 deleteExpense
);

module.exports = router;
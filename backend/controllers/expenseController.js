const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => {
  try {
    const { title, amount, category } =
      req.body;

    const expense =
      await Expense.create({
        userId: req.user.id,
        title,
        amount,
        category
      });

    res.status(201).json(expense);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses =
      await Expense.find({
        userId: req.user.id
      }).sort({ date: -1 });

    res.json(expenses);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message: "Expense Deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
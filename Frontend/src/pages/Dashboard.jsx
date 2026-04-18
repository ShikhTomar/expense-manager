import { useEffect, useState } from "react";
import API from "../services/api";
import { FaTrash, FaEdit } from "react-icons/fa";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("");

  const token = localStorage.getItem("token");

  // Fetch expenses
  const fetchExpenses = async () => {
    const res = await API.get("/api/expense/all", {
      headers: { Authorization: token }
    });
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Add / Update
  const handleSubmit = async () => {
    try {
      if (editingId) {
        // simple update logic
        await API.delete(`/api/expense/${editingId}`, {
          headers: { Authorization: token }
        });

        await API.post("/api/expense/add", form, {
          headers: { Authorization: token }
        });

        setEditingId(null);
      } else {
        await API.post("/api/expense/add", form, {
          headers: { Authorization: token }
        });
      }

      setForm({ title: "", amount: "", category: "" });
      fetchExpenses();
    } catch {
      alert("Error saving expense");
    }
  };

  // Delete
  const deleteExpense = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    await API.delete(`/api/expense/${id}`, {
      headers: { Authorization: token }
    });

    fetchExpenses();
  };

  // Edit
  const editExpense = (e) => {
    setForm({
      title: e.title,
      amount: e.amount,
      category: e.category
    });
    setEditingId(e._id);
  };

  // Filter
  const filtered = filter
    ? expenses.filter((e) =>
        e.category.toLowerCase().includes(filter.toLowerCase())
      )
    : expenses;

  // Total
  const total = filtered.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="dashboard">

      <h2 className="text-center white-text mb-3">💰 Dashboard</h2>

      <h4 className="text-center white-text mb-3">
        Total ₹ {total}
      </h4>

      {/* FILTER */}
      <input
        className="form-control mb-3"
        placeholder="🔍 Filter by category"
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* FORM */}
      <div className="card-box">
        <input className="form-control mb-2" placeholder="Title"
          value={form.title}
          onChange={(e)=>setForm({...form,title:e.target.value})} />

        <input className="form-control mb-2" placeholder="Amount"
          value={form.amount}
          onChange={(e)=>setForm({...form,amount:e.target.value})} />

        <input className="form-control mb-2" placeholder="Category"
          value={form.category}
          onChange={(e)=>setForm({...form,category:e.target.value})} />

        <button className="btn btn-primary w-100" onClick={handleSubmit}>
          {editingId ? "Update Expense" : "Add Expense"}
        </button>
      </div>

      {/* LIST */}
      {filtered.map((e) => (
        <div
          className="card-box"
          key={e._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <h5>{e.title}</h5>
            <p>₹ {e.amount}</p>
            <small>{e.category}</small>
          </div>

          {/* ICON BUTTONS */}
          <div style={{ display: "flex", gap: "8px" }}>

            {/* EDIT BUTTON */}
            <button
              onClick={() => editExpense(e)}
              style={{
                background: "#ffc107",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <FaEdit size={14} color="#000" />
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteExpense(e._id)}
              style={{
                background: "#ff4d6d",
                border: "none",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer"
              }}
            >
              <FaTrash size={14} color="#fff" />
            </button>

          </div>
        </div>
      ))}

    </div>
  );
}

export default Dashboard;
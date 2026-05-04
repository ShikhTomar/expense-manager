import { useEffect, useState } from "react";
import API from "../services/api";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const fetchBooks = async () => {
    const res = await API.get("/api/books/all");
    setBooks(res.data);
  };

  const addBook = async () => {
    await API.post("/api/books/add", { title, author });
    fetchBooks();
  };

  const deleteBook = async (id) => {
    await API.delete(`/api/books/${id}`);
    fetchBooks();
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="dashboard">
  <h2>📚 Library Manager</h2>

  <div className="add-box">
    <input placeholder="Book title" onChange={(e) => setTitle(e.target.value)} />
    <input placeholder="Author" onChange={(e) => setAuthor(e.target.value)} />
    <button onClick={addBook}>Add</button>
  </div>

  {books.map((b) => (
    <div className="card" key={b._id}>
      <div>
        <h4>{b.title}</h4>
        <p>{b.author}</p>
      </div>

      <button onClick={() => deleteBook(b._id)}>🗑</button>
    </div>
  ))}
</div>
  );
}
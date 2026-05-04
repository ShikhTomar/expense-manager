import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [name, setName] = useState("");   // ✅ NEW
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/api/auth/register", {
        name,      // ✅ SEND NAME
        email,
        password
      });

      alert("Registration Successful 🎉");
      navigate("/login");

    } catch (err) {
  console.log(err.response);   // 👈 ADD THIS
  alert(err.response?.data?.message || err.message);
}
  };

  return (
    <div className="center-box">
      <h2>📝 Create Account</h2>

      {/* ✅ NAME INPUT */}
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>
        Register
      </button>
    </div>
  );
}
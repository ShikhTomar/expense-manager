import { useState } from "react";
import API from "../services/api";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      await API.post("/api/auth/register", data);
      alert("Registered Successfully");
      window.location.href = "/";
    } catch {
      alert("Error");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="glass-card">
        <h2 className="text-center mb-3">Register</h2>

        <input
          className="form-control mb-2"
          placeholder="Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          className="form-control mb-2"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
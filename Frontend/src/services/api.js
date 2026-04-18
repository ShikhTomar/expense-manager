import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-backend-a221.onrender.com"
});

export default API;
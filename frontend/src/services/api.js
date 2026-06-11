import axios from "axios";

const API = axios.create({
  baseURL: "https://briefpilot-backend.onrender.com",
});

export default API;
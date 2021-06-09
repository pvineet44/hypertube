import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5001/hypertube-d9f3e/us-central1/api",
});

export default instance;

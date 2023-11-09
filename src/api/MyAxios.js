import axios from "axios";

export default axios.create({
  // baseURL: "https://vdhuy.azurewebsites.net/api",
  baseURL: "http://localhost:443/api",
  // baseURL: "https://myleague-khaq.azurewebsites.net/api/",
});

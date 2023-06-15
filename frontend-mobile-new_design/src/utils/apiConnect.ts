import axios from "axios";

// const header = {
//   Authorization: `Bearer ${token}`,
// };

export default axios.create({
  baseURL: "http://stomble/api",
});

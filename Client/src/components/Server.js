import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000"
});
// export default axios.create({
//   baseURL: "https://relationshipapp-starchcode.herokuapp.com"
// });

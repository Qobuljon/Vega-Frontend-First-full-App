import axios from "axios"
const mainURL = axios.create({
    baseURL: "https://vega-backend-first-ready-app.onrender.com"
    // baseURL: "https://vega-backend-g07s.onrender.com/"
    // baseURL: "https://vega-backend-qobuljon.vercel.app/"
    // baseURL: "http://localhost:8000/"
    // baseURL: "https://mustang-backend.herokuapp.com"
})
export default mainURL
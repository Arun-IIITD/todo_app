import axios from "axios"

const BACKEND_URL = axios.create({
    baseURL: "https://todo-app-1-qgga.onrender.com/"
})

export default BACKEND_URL
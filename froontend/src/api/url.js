import axios from "axios"
//https://todo-app-2-htas.onrender.com

const BACKEND_URL = axios.create({
    baseURL: "https://todo-app-2-htas.onrender.com/api/v1/noteapp/"
})

export default BACKEND_URL
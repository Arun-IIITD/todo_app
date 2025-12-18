import axios from "axios"
//https://todo-app-2-htas.onrender.com
//http://localhost:5000/

const token = JSON.parse(localStorage.getItem("user"))?.token;

const BACKEND_URL = axios.create({
    baseURL: "http://localhost:5000/api/v1/noteapp/",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default BACKEND_URL
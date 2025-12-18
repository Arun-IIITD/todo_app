import axios from "axios"
//https://todo-app-4-7og2.onrender.com/
//http://localhost:5000/

const token = JSON.parse(localStorage.getItem("user"))?.token;

const BACKEND_URL = axios.create({
    baseURL: "https://todo-app-4-7og2.onrender.com/api/v1/noteapp/",
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default BACKEND_URL
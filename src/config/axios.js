import axios from "axios";


const api = axios.create({
    baseURL: 'http://143.198.196.146:8080/',
})

export default api;
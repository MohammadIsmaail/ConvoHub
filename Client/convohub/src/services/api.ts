import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:5000",
    headers:{
        "Content-Type":"application/json"
    }
})
//  interceptor ka use isliye karte hai ki sath main token pass hota rahe
api.interceptors.request.use((config)=>{
     const token = localStorage.getItem("token")
     if(token){
        config.headers.Authorization = `Bearer ${token}`
     }
     return config
},
(error)=>{
    return Promise.reject(error)
}
)
export default api
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

export const userRegister=({data})=>{
    return api.post('/register',{
        fullname:data.fullname,
        email:data.email,
        password:data.password
    })
}

export const userLogin=({data})=>{
    return api.post('/login',{
        email:data.email,
        password:data.password
    })
}
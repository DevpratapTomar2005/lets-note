import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
  });

export const userRegister=({data})=>{
    return api.post('/auth/register',{
        fullname:data.fullname,
        email:data.email,
        password:data.password
    })
}

export const userLogin=({data})=>{
    return api.post('/auth/login',{
        email:data.email,
        password:data.password
    })
}

export const userLogout=()=>{
    return api.post('/auth/logout')
}

export const refreshUserToken=()=>{
return api.post('/auth/refresh-token')
}

export const persistUserNextVisit=()=>{
    return api.get('/auth/persist-user-next-visit')
}



export const createTodo=({data})=>{
    return api.post('/user/create-todo',
    {
        todoData:data
    })
}

export const deleteTodo=(id)=>{
    return api.post(`/user/delete-todo`,{
        id:id
    })
}
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
    return api.post('/user/delete-todo',{
        id:id
    })
}
export const taskCompleted=({id,completed})=>{
    return api.post('/user/task-completed',{
        id,
        completed
    })
}

export const createNote=(title)=>{
    return api.post('/user/create-note',{
        title
    })
}
export const deleteNote=(id)=>{
    return api.post('/user/delete-note',{
       id
    })
}

export const updateNote=({id,content})=>{
    
    return api.post('/user/update-note',{
        id,
        content
    })
}

export const uploadContentImg=(formData)=>{
   
    return api.post('/user/upload-content-img',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export const uploadPfp=(formData)=>{
    return api.post('/user/upload-pfp',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

export const promptAi=(prompt,fcmToken)=>{
    return api.post('/user/aiagent',{
        message:prompt,
        fcmToken:fcmToken
    })
}

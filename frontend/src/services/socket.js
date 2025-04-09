import io from 'socket.io-client';

const socketOptions = {
    reconnection: true,       
    reconnectionAttempts: 5,   
    reconnectionDelay: 1000,    
    timeout: 5000,              
    transports: ['websocket'],  
  };

 export const initSocket=async()=>{
    const socket=io(import.meta.env.VITE_SERVER_URL, socketOptions)
    return socket
  }


import  app  from 'firebase-admin'
import admin from './firebaseAdmin.js'


const sendNotifications=async(deviceToken,title,body)=>{
    const message={
        notification:{
            title:title,
            body:body,
        },
      
     token:deviceToken
        
    }
    try{
        return await admin.messaging(app).send(message)
       
    }
    catch(error){
        throw new Error(error)
    }
}

export default sendNotifications
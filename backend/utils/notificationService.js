import  app  from 'firebase-admin'
import admin from './firebaseAdmin.js'


const sendNotifications=async(deviceToken,title,body)=>{
  const message = {
  notification: {
    title: title,
    body: body,
  },
  token: deviceToken,
  webpush: {
    headers: {
      Urgency: 'high',
    },
    notification: {
      click_action: 'https://www.letsnote.in/'
    }
  }
}
    try{
        return await admin.messaging(app).send(message)
       
    }
    catch(error){
        throw new Error(error)
    }
}

export default sendNotifications
import schedule from "node-schedule";
import sendNotifications  from "./notificationService.js";

export const rescheduleNotification = (todo) => {
  if (!todo.notifyMe || !todo.notificationTime || !todo.deviceToken) return;
   const [hour, minute] = todo.notificationTime.split(':').map(Number);  
    const scheduledDate = new Date(todo.dueDate)
      scheduledDate.setHours(hour);
      scheduledDate.setMinutes(minute);
      scheduledDate.setSeconds(0);
      scheduledDate.setMilliseconds(0);
  if (scheduledDate < new Date()) return; 

  schedule.scheduleJob(scheduledDate, async () => {
    await sendNotifications(todo.deviceToken, todo.title, "You have a task due!!");
  });
};
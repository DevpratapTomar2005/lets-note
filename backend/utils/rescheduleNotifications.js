import schedule from "node-schedule";
import sendNotifications  from "./notificationService.js";

export const rescheduleNotification = (todo) => {
  if (!todo.notifyMe || !todo.notificationTime || !todo.deviceToken) return;

  const scheduledDate = new Date(`${todo.dueDate} ${todo.notificationTime}`);
  if (scheduledDate < new Date()) return; 

  schedule.scheduleJob(scheduledDate, async () => {
    await sendNotifications(todo.deviceToken, todo.title, "You have a task due!!");
  });
};
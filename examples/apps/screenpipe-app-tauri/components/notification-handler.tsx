import React, { useEffect, useState } from "react";
import {
  isPermissionGranted,
  requestPermission,
  ScheduleEvery,
  sendNotification,
} from "@tauri-apps/plugin-notification";

const NotificationHandler: React.FC = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    const checkAndRequestPermission = async () => {
      let permission = await isPermissionGranted();
      console.log("notifcation permission", permission);

      if (!permission) {
        const result = await requestPermission();
        permission = result === "granted";
      }

      setPermissionGranted(permission);

      if (permission) {
        sendNotification({
          title: "Welcome to Screenpipe",
          body: "Thank you for using Screenpipe! We're here to enhance your experience.",
        });
      }
      // TODO: send notfication when api is down to restart it
    };

    checkAndRequestPermission();
  }, []);

  return null; // This component doesn't render anything
};

export default NotificationHandler;

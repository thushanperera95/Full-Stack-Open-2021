import { React } from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification) {
    return null;
  }

  return (
    <Alert className="notification" severity={notification.type}>
      {notification.message}
    </Alert>
  );
};

export default Notification;

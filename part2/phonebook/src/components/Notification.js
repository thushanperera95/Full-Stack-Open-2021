import React from "react";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  let notificationStyle = null;
  switch (notification.type) {
    case "error":
      notificationStyle = {
        color: "red",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "20px",
      };
      break;
    case "info":
      notificationStyle = {
        color: "green",
        background: "lightgrey",
        fontSize: "20px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "20px",
      };
      break;
    default:
      notificationStyle = null;
  }

  return <div style={notificationStyle}>{notification.message}</div>;
};

export default Notification;

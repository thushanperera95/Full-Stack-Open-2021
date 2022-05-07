import { React } from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  if (!notification) {
    return null;
  }

  const determineStyle = () => {
    switch (notification.type) {
      case "error":
        return {
          color: "red",
          background: "lightgrey",
          fontSize: "20px",
          borderStyle: "solid",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "20px",
        };
      case "info":
        return {
          color: "green",
          background: "lightgrey",
          fontSize: "20px",
          borderStyle: "solid",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "20px",
        };
    }
  };

  return (
    <div className="notification" style={determineStyle()}>
      {notification.message}
    </div>
  );
};

Notification.displayName = "Notification";

export default Notification;

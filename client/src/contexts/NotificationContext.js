import React, { useEffect, useState } from "react";

export const NotificationContext = React.createContext();

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;

import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SendNotiFicationPage from './components/send-noti';
import ReceiveNotiFicationPage from './components/receive-noti';
import { addNotification, onNotificationsSnapshot } from './firebase/firebase';

function App() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = onNotificationsSnapshot((newNotifications) => {
      setNotifications(newNotifications);
    });

    return () => unsubscribe();
  }, []);

  const handleSendNotification = async (notificationContent) => {
    const notification = {
      body: notificationContent,
      timestamp: new Date(),
    };

    await addNotification(notification);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <SendNotiFicationPage
              handleSendNotification={handleSendNotification}
            />
          }
        />
        <Route
          path="/receive"
          element={<ReceiveNotiFicationPage notifications={notifications} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

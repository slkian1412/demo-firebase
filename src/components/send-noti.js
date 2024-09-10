import React, { useState } from 'react';

const SendNotiFicationPage = ({ handleSendNotification }) => {
  const [notificationContent, setNotificationContent] = useState('');
  return (
    <div className="send-notification-container">
      <input
        className="notification-input"
        placeholder="Enter notification message"
        onChange={(e) => setNotificationContent(e.target.value)}
        value={notificationContent}
      />
      <button
        className="send-notification-button"
        onClick={() => {
          handleSendNotification(notificationContent);
          setNotificationContent('');
        }}
      >
        Send Notification
      </button>
    </div>
  );
};

export default SendNotiFicationPage;

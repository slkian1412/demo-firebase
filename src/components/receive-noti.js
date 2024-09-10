import React from 'react';
import './styles.css';
const ReceiveNotiFicationPage = ({ notifications }) => {
  return (
    <div className="receive-notification-container">
      <span className="page-title">Receive Notification Page</span>
      <div className="notifications-list">
        <h2>Notifications:</h2>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="notification-item">
              {notification.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ReceiveNotiFicationPage;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationTriangle, faInfoCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: number;
  type: 'success' | 'warning' | 'info' | 'error';
  message: string;
  time: Date;
}

const notificationsData: Notification[] = [
  { id: 1, type: 'success', message: 'Order #12345 has been successfully placed.', time: new Date(Date.now() - 5 * 60 * 1000) },
  { id: 2, type: 'info', message: 'A new software update is available. Please update.', time: new Date(Date.now() - 30 * 60 * 1000) },
  { id: 3, type: 'warning', message: 'Low stock alert for "Spicy Noodles".', time: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: 4, type: 'error', message: 'Payment processing failed for order #56789.', time: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: 5, type: 'success', message: 'New customer "John Doe" registered.', time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
];

const getIconByType = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return faCheckCircle;
    case 'warning':
      return faExclamationTriangle;
    case 'info':
      return faInfoCircle;
    case 'error':
      return faTimesCircle;
    default:
      return null;
  }
};

const getColorByType = (type: Notification['type']) => {
  switch (type) {
    case 'success':
      return 'text-green-500';
    case 'warning':
      return 'text-yellow-500';
    case 'info':
      return 'text-blue-500';
    case 'error':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

const Notifications: React.FC = () => {
  return (
    <div className="absolute top-12 right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
      <h3 className="bg-gray-100 px-4 py-3 text-gray-700 font-semibold border-b border-gray-200">
        Notifications
      </h3>
      <ul className="divide-y divide-gray-200">
        {notificationsData.length > 0 ? (
          notificationsData.map((notification) => (
            <li key={notification.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={getIconByType(notification.type) || faInfoCircle} className={`w-5 h-5 ${getColorByType(notification.type)}`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500">{formatDistanceToNow(notification.time, { addSuffix: true })}</p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-3 text-center text-gray-600">No new notifications</li>
        )}
      </ul>
      {notificationsData.length > 5 && (
        <div className="bg-gray-100 px-4 py-3 text-center border-t border-gray-200">
          <button className="text-sm text-teal-500 hover:text-teal-700 focus:outline-none">
            See All Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Notifications;
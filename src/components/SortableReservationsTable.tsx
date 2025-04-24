import React, { useState, useMemo, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

// Define the structure of a reservation object
interface Reservation {
  id: number;
  guestName: string;
  tableNumber: number;
  reservationTime: Date;
  partySize: number;
  status: string;
  notes?: string;
}

// Sample reservation data (replace with your actual data fetching)
const initialReservations: Reservation[] = [
  { id: 1, guestName: 'John Doe', tableNumber: 5, reservationTime: new Date(2025, 3, 25, 18, 0), partySize: 4, status: 'confirmed' },
  { id: 2, guestName: 'Jane Smith', tableNumber: 3, reservationTime: new Date(2025, 3, 25, 19, 0), partySize: 2, status: 'pending' },
  { id: 3, guestName: 'Alice Johnson', tableNumber: 2, reservationTime: new Date(2025, 3, 25, 20, 0), partySize: 3, status: 'cancelled' },
  { id: 4, guestName: 'Bob Brown', tableNumber: 4, reservationTime: new Date(2025, 3, 25, 18, 30), partySize: 5, status: 'confirmed' },
  { id: 5, guestName: 'Charlie Davis', tableNumber: 6, reservationTime: new Date(2025, 3, 25, 19, 30), partySize: 6, status: 'pending' },
  { id: 6, guestName: 'Diana Prince', tableNumber: 7, reservationTime: new Date(2025, 3, 25, 20, 30), partySize: 8, status: 'confirmed' },
  { id: 7, guestName: 'Grace Kelly', tableNumber: 1, reservationTime: new Date(2025, 3, 25, 18, 0), partySize: 2, status: 'confirmed' },
];

interface SortConfig {
  key: keyof Reservation | null;
  direction: 'ascending' | 'descending' | null;
}

const SortableReservationsTable: React.FC = () => {
  const [reservations, setReservations] = useState(initialReservations);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null });

  const sortedReservations = useMemo(() => {
    if (!sortConfig.key) {
      return reservations;
    }

    const sortableItems = [...reservations];
    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableItems;
  }, [reservations, sortConfig]);

  const requestSort = useCallback((key: keyof Reservation) => {
    let direction: 'ascending' | 'descending' | null = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = null;
    }
    setSortConfig({ key, direction });
  }, [sortConfig, setSortConfig]);

  const getSortIcon = (key: keyof Reservation) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? faSortUp : faSortDown;
    }
    return faSort;
  };

  const getStatusClassName = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'seated':
        return 'bg-blue-100 text-blue-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  return (
    <div className="overflow-x-auto w-full rounded-lg shadow-md">
      <table className="w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button onClick={() => requestSort('id')} className="flex items-center space-x-1 focus:outline-none">
                ID <FontAwesomeIcon icon={getSortIcon('id')} className="w-3 h-3" />
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button onClick={() => requestSort('guestName')} className="flex items-center space-x-1 focus:outline-none">
                Guest Name <FontAwesomeIcon icon={getSortIcon('guestName')} className="w-3 h-3" />
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button onClick={() => requestSort('tableNumber')} className="flex items-center space-x-1 focus:outline-none">
                Table <FontAwesomeIcon icon={getSortIcon('tableNumber')} className="w-3 h-3" />
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button onClick={() => requestSort('reservationTime')} className="flex items-center space-x-1 focus:outline-none">
                Time <FontAwesomeIcon icon={getSortIcon('reservationTime')} className="w-3 h-3" />
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <button onClick={() => requestSort('partySize')} className="flex items-center space-x-1 focus:outline-none">
                Guests <FontAwesomeIcon icon={getSortIcon('partySize')} className="w-3 h-3" />
              </button>
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th scope="col" className="relative px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedReservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{reservation.id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{reservation.guestName}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{reservation.tableNumber}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{format(reservation.reservationTime, 'MMM dd, yyyy h:mm a')}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{reservation.partySize}</td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClassName(reservation.status)}`}>
                  {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-500">{reservation.notes}</td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-teal-600 hover:text-teal-900 focus:outline-none">Edit</button>
              </td>
            </tr>
          ))}
          {sortedReservations.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-4 text-center text-gray-500">
                No reservations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SortableReservationsTable;
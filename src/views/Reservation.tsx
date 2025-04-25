import React, { useState } from 'react';

interface RestaurantBooking {
  bookingId: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'SEATED' | 'COMPLETED';
  customerName: string;
  tableNumber: string;
  bookingDateTime: string;
  partySize: number;
  notes?: string;
}

const RestaurantBookingList: React.FC = () => {
  const [bookings] = useState<RestaurantBooking[]>([
    {
      bookingId: "RES20250426-001",
      status: "CONFIRMED",
      customerName: "John Doe",
      tableNumber: "A12",
      bookingDateTime: "2025-04-26 19:00",
      partySize: 2,
      notes: "Window seat preferred",
    },
    {
      bookingId: "RES20250426-002",
      status: "PENDING",
      customerName: "Jane Smith",
      tableNumber: "B05",
      bookingDateTime: "2025-04-26 20:30",
      partySize: 4,
    },
    {
      bookingId: "RES20250426-003",
      status: "CANCELLED",
      customerName: "Alice Johnson",
      tableNumber: "C01",
      bookingDateTime: "2025-04-26 18:00",
      partySize: 1,
    },
    {
      bookingId: "RES20250426-004",
      status: "SEATED",
      customerName: "Bob Brown",
      tableNumber: "A15",
      bookingDateTime: "2025-04-26 12:30",
      partySize: 3,
      notes: "Birthday celebration",
    },
    {
      bookingId: "RES20250426-005",
      status: "COMPLETED",
      customerName: "Charlie Davis",
      tableNumber: "B10",
      bookingDateTime: "2025-04-25 21:00",
      partySize: 2,
    },
  ]);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const filters = ["ALL", "PENDING", "CONFIRMED", "SEATED", "COMPLETED", "CANCELLED"];

  const filteredBookings = activeFilter === "ALL"
    ? bookings
    : bookings.filter(booking => booking.status === activeFilter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Restaurant Bookings</h1>
        <div className="space-x-2">
          <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md shadow-sm transition duration-150 ease-in-out">
            Export
          </button>
          <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md shadow-sm transition duration-150 ease-in-out">
            Import
          </button>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-sm transition duration-150 ease-in-out font-medium">
            + Add New Booking
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4 overflow-x-auto">
          <div className="inline-flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`px-3 py-1 rounded-md whitespace-nowrap text-sm font-medium shadow-sm transition duration-150 ease-in-out
                  ${activeFilter === filter
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : ["CONFIRMED", "PENDING"].includes(filter)
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full leading-normal">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  <input type="checkbox" />
                </th>
                <th className="px-3 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booking ID
                </th>
                <th className="px-3 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-3 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-3 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Table No.
                </th>
                <th className="px-3 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-3 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Party Size
                </th>
                <th className="px-3 py-3 border-b border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b border-gray-200 text-sm">
                    <input type="checkbox" />
                  </td>
                  <td className="px-3 py-2 border-b border-gray-200 text-sm text-gray-800">{booking.bookingId}</td>
                  <td className="px-3 py-2 border-b border-gray-200 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-semibold
                        ${booking.status === "CONFIRMED" ? "bg-green-500"
                          : booking.status === "PENDING" ? "bg-yellow-500"
                          : booking.status === "CANCELLED" ? "bg-red-500"
                          : booking.status === "SEATED" ? "bg-blue-500"
                          : booking.status === "COMPLETED" ? "bg-gray-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-3 py-2 border-b border-gray-200 text-sm text-gray-800">{booking.customerName}</td>
                  <td className="px-3 py-2 border-b border-gray-200 text-sm text-gray-800">{booking.tableNumber}</td>
                  <td className="px-3 py-2 border-b border-gray-200 text-sm text-gray-800">{booking.bookingDateTime}</td>
                  <td className="px-3 py-2 border-b border-gray-200 text-sm text-gray-800">{booking.partySize}</td>
                  <td className="px-3 py-2 border-b border-gray-200 text-sm text-gray-800">{booking.notes}</td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-3 py-4 text-center text-gray-500">
                    No bookings found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center text-sm text-gray-600">
            Show
            <select className="mx-2 border rounded-md py-1 px-2">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            entries
          </div>
          <div className="space-x-2">
            <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-sm transition duration-150 ease-in-out">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition duration-150 ease-in-out">
              1
            </button>
            <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-sm transition duration-150 ease-in-out">
              2
            </button>
            <span className="text-gray-500">...</span>
            <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-sm transition duration-150 ease-in-out">
              10
            </button>
            <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md shadow-sm transition duration-150 ease-in-out">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantBookingList;
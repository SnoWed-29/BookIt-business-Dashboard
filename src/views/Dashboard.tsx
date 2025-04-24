import React from "react";
import KpiSection from "../components/KpiSection";
import SortableReservationsTable from "../components/SortableReservationsTable";

const Dashboard: React.FC = () => {
    return (
        <div className="flex w-full flex-col space-y-6 p-6"> {/* Added padding for better spacing */}
            <KpiSection />
            <div className="flex flex-col space-y-5 w-full">
                <div className="flex items-center justify-between"> {/* Flex container for title and potential actions */}
                    <h2 className="text-xl font-semibold text-gray-800">
                         Latest Reservations
                    </h2>
                    {/* You can add more elements here, like a "New Reservation" button */}
                    <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
                        All Reservation
                    </button> 
                </div>
                <SortableReservationsTable />
            </div>
        </div>
    );
}
export default Dashboard;
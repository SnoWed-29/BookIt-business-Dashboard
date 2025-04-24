import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import CountUp from 'react-countup'; // For animated number transitions

const KpiSection: React.FC = () => {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Total Customers
                    </h3>
                    <div className="flex items-center mt-4">
                        <div className="text-3xl font-extrabold text-teal-500">
                            <CountUp end={530}  />
                        </div>
                        <span className="ml-2 text-gray-700 font-medium">Customers</span>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Peak Hours
                    </h3>
                    <div className="flex items-center mt-4">
                        <div className="text-3xl font-extrabold text-indigo-500">
                            7pm - 10pm
                        </div>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Busiest time of the day</p>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="px-6 py-8">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                        Average Rating
                    </h3>
                    <div className="flex items-center mt-4">
                        <div className="text-3xl font-extrabold text-yellow-500">
                            4.7
                        </div>
                        <span className="ml-2 text-xl text-gray-700">/ 5</span>
                        <FontAwesomeIcon icon={faStar} className="ml-2 text-yellow-500" />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">Based on customer reviews</p>
                </div>
            </div>
        </div>
    );
}

export default KpiSection;
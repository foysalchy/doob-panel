import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ReactToPrint from "react-to-print";
import LoaderData from "../../../Common/LoaderData";

const FinanceReport = () => {
  const { shopInfo } = useContext(AuthContext);
  const queryClient = useQueryClient(); // Initialize useQueryClient
  const componentRef = useRef();

  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return oneMonthAgo.toISOString().split("T")[0]; // Initial start date one month ago
  });
  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // Initial end date is today
  });
  const [error, setError] = useState(null);
  const [financialReport, setFinancialReport] = useState([]);

  const [loadingReport, setLoadingReport] = useState(false);
  console.log(financialReport);
  const fetchFinancialReport = async () => {
    setLoadingReport(true);
    const apiUrl = "http://localhost:5001/api/v1/seller/my-financial-report";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: new Date(startDate).getTime(),
          end_date: new Date(endDate).getTime(),
          shop_id: shopInfo._id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch financial report");
      }

      const data = await response.json();
      console.log("Fetched financial report data:", data);
      setFinancialReport(data);
      setLoadingReport(false);
    } catch (error) {
      console.error("Error fetching financial report:", error);
      setLoadingReport(false);
      throw error;
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError(null); // Clear any previous errors
    fetchFinancialReport(); // Call the mutation to generate report
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    // Ensure end date is at least one day greater than the start date
    if (selectedStartDate >= endDate) {
      const newEndDate = new Date(selectedStartDate);
      newEndDate.setDate(newEndDate.getDate() + 1);
      setEndDate(newEndDate.toISOString().split("T")[0]);
    }
    setStartDate(selectedStartDate);
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    // Ensure end date is at least one day greater than the start date
    if (selectedEndDate <= startDate) {
      const newStartDate = new Date(selectedEndDate);
      newStartDate.setDate(newStartDate.getDate() - 1);
      setStartDate(newStartDate.toISOString().split("T")[0]);
    }
    setEndDate(selectedEndDate);
  };
  const printButtonRef = useRef(null);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl font-semibold mb-4">Financial Report</h2>
      <div className="flex items-end gap-4">
        <div className="flex items-center gap-4 ">
          <div className="flex flex-col">
            <label htmlFor="start_date" className="text-sm text-gray-600">
              Start Date
            </label>
            <input
              id="start_date"
              name="start_date"
              type="date"
              className="w-[180px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              value={startDate}
              onChange={handleStartDateChange}
              max={endDate}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="end_date" className="text-sm text-gray-600">
              End Date
            </label>
            <input
              id="end_date"
              name="end_date"
              type="date"
              className="w-[180px] border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              max={new Date().toISOString().split("T")[0]} // Prevent selecting current date
            />
          </div>
        </div>
        <div>
          <ReactToPrint
            trigger={() => (
              <button
                ref={printButtonRef}
                // disabled={loader}
                className="bg-blue-500 px-4 py-2.5 text-white rounded hover:bg-blue-600 focus:outline-noneya"
              >
                Print
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {financialReport && (
        <div
          ref={componentRef}
          className="border mt-4 mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
        >
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <div className="text-gray-600">Expected Payout Date:</div>
              <div className="text-gray-900">
                {new Date(startDate).toDateString()} to{" "}
                {new Date(endDate).toDateString()}
              </div>
            </div>
          </div>
          <div className="py-2">{loadingReport && <LoaderData />}</div>
          {Object.entries(financialReport).map(([key, value]) => (
            <div className="flex justify-between items-center bg-gray-100 p-4">
              <div className="text-lg font-semibold">{key}</div>
              <div className="text-lg font-semibold text-gray-700">
                {" "}
                <span className=" kalpurush">৳</span> {value}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FinanceReport;

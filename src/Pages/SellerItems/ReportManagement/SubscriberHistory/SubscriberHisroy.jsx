import React, { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import Swal from "sweetalert2";
import { FaArrowRightLong } from "react-icons/fa6";
import showAlert from "../../../../Common/alert";
import * as XLSX from "xlsx"; // Import xlsx for reading Excel files

const SubscriberHistory = () => {
  const { shopInfo } = useContext(AuthContext);
  const { data: subscriber = [], refetch } = useQuery({
    queryKey: ["subscriberSeller"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/seller/get-all-subscribe?shopId=${shopInfo?.shopId}`
      );
      const data = await res.json();
      return data?.data;
    },
  });

  const [emailRequired, setEmailRequired] = useState(false);
  const [loading, setLoading] = useState(false); // State for loader during import
  const [error, setError] = useState(""); // Error state for handling validation

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const [file, setFile] = useState(null);
  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      const fileType = selectedFile?.type;
    
      if (selectedFile) {
        if (
          fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
          selectedFile.name.endsWith(".csv")
        ) {
          setFile(selectedFile); // Save the selected file to state
          setError(null); // Clear any previous error
        } else {
          setError("Invalid file format. Please upload an Excel or CSV file.");
        }
      }
    };
    
    
    
    const handleEmailExport = async () => {
      const emails = subscriber; // Assuming 'subscriber' is an array of email objects
    
      // If emails are in an array of objects, extract the email property
      
      const emailList = emails.map(sub => sub.email.replace(/"/g, '""')); // Adjust if needed, based on your data structure
    
      // Add a header to the CSV file
      const header = "Email"; // Header for the CSV
      const csvContent = "data:text/csv;charset=utf-8,"  + "\n" + emailList.join("\n");
    
      // Create a link element to trigger the download
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "emails.csv"); // Set the filename for download
      document.body.appendChild(link); // Append the link to the document
    
      // Trigger the download
      link.click();
    
      // Optionally, remove the link after the download
      document.body.removeChild(link);
    };
    
    const handleFileUpload = async () => {
      if (!file) {
        setError("Please select a file first.");
        return;
      }
    
      setLoading(true);
      const reader = new FileReader();
    
      reader.onload = async (event) => {
        const fileContent = event.target.result;
    
        let emails = [];
    
        if (file.name.endsWith(".csv")) {
          // Parse CSV file
          const rows = fileContent.split("\n");
          emails = rows
            .map((row) => row.split(",")[0]) // Assuming emails are in the first column
            .filter(Boolean);
        } else if (file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
          // Process Excel file (XLSX)
          const workbook = XLSX.read(fileContent, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const data = XLSX.utils.sheet_to_json(sheet);
    
          // Extract email addresses from the sheet
          emails = data.map((row) => row.email).filter(Boolean);
        }
    
        // Process emails one by one
        for (let email of emails) {
          await processEmail(email);
        }
    
        setLoading(false);
        refetch();
      };
    
      if (file.name.endsWith(".csv")) {
        reader.readAsText(file); // Read CSV as text
      } else {
        reader.readAsBinaryString(file); // Read Excel as binary string
      }
    };
    

  const processEmail = async (emails) => {
    // Placeholder function to process the emails (send them to API, etc.)
    console.log("Processing emails:", emails);
    setLoading(true);
    try {
      const res = await fetch("https://doob.dev/api/v1/seller/subscriber-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emails,
          shopId: shopInfo.shopId,
          date: new Date(),
        }),
      });
      const data = await res.json();
      if (data.status='success') {
        showAlert("Emails imported successfully!", "", "success");
        refetch(); // Refetch subscriber data to update the list
      } else {
        showAlert("Import failed", data.message, "error");
      }
    } catch (error) {
      showAlert("Error", "An error occurred while importing", "error");
    } finally {
      setLoading(false);
    }
  };

  const DeleteCategory = (id) => {
    fetch(`https://doob.dev/api/v1/seller/delete-subscribe?id=${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        showAlert("Subscriber Deleted Successfully", "", "success");
        refetch();
      });
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = subscriber.filter((item) =>
      item.email ? item.email.toLowerCase().includes(searchQuery.toLowerCase()):[]
  );

  return (
    <div>
      <div className="flex items-center space-y-4 gap-2">
      <h2 className="text-xl font-semibold">Import (.xls or xlsx)</h2>
      <input
        type="file"
        accept=".xlsx,.xls,.csv"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleFileUpload}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Import
      </button>
      <button
        onClick={handleEmailExport}
        className="px-6 py-2 bg-info-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Export
      </button>
      {loading ? (
                                                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                                                      <div className="bg-white p-4 rounded-md shadow-md">
                                                            <div className="flex items-center space-x-2">
                                                                  <div className="w-6 h-6 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                                                                  <span className="text-gray-700">Please Wait...</span>
                                                            </div>
                                                      </div>
                                                </div>
                                          ) : (
                                                <></>
                                          )}
      {error && <div className="error text-red-500 mt-4">{error}</div>}
    </div>
      <div className="relative my-6">
      
        <input
          type="text"
          id="Search"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for..."
          className="w-full px-5 rounded-md border border-gray-900 py-2.5 pe-10 shadow-sm sm:text-sm"
        />
      </div>

      <div className="bar overflow-x-auto mt-4 pr-10">
        {filteredData.length > 0 ? (
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left bg-gray-800 rounded-xl">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                  Subscriber
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                  Time
                </th>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-100">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((subscrib) => (
                <tr key={subscrib._id}>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {subscrib.email}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    {new Date(subscrib.dateTime).toDateString()}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2">
                    <button
                      onClick={() => DeleteCategory(subscrib._id)}
                      className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1>No Data Found</h1>
        )}
      </div>

      {/* File Upload Section */}
   
    </div>
  );
};

export default SubscriberHistory;

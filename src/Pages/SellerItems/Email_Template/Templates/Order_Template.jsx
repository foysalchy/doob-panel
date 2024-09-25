import { useQuery } from '@tanstack/react-query';
import BrightAlert from 'bright-alert';
import { useState, FormEvent, useMemo, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AuthContext } from '../../../../AuthProvider/UserProvider';


const Order_Template = () => {

      const { shopInfo } = useContext(AuthContext)



      const {
            data: innerText = {},
            isLoading: innerText_loading,
            refetch,
      } = useQuery({
            queryKey: ["seller_innerText"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/seller/mail-template?status=order_invoice&shop_id=${shopInfo._id}`
                  );
                  const data = await res.json();
                  console.log(data);
                  return data;
            },
      });



      // const innerText = {
      //       title: "New Order Notification",
      //       greeting: "Dear User,",
      //       message: "A new order has been placed on your e-commerce platform. Here are the details:",
      //       footer: "Please process the order accordingly."

      // };


      const [formData, setFormData] = useState(innerText);
      useEffect(() => {
            const filteredInnerText = Object.fromEntries(
                  Object.entries(innerText).filter(([key]) => key !== '_id' && key !== 'status' && key !== 'shop_id')
            );

            setFormData(filteredInnerText)

      }, [innerText]);



      const [userName, setUserName] = useState("user_name"); // Non-editable username

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevData => ({
                  ...prevData,
                  [name]: value
            }));
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            const status = 'order_invoice';

            const data = {
                  ...formData,
                  status,
                  shop_id: shopInfo._id
            };

            try {
                  const response = await fetch('https://doob.dev/api/v1/seller/update-template', {
                        method: 'PATCH',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                  });

                  if (!response.ok) {
                        throw new Error('Network response was not ok');
                  }

                  const result = await response.json();

                  console.log(result); // Handle the response as needed
                  BrightAlert({ timeDuration: 3000, title: result.message, icon: 'success' });

                  // Reset form data to original innerText or any other action you want to perform
                  setFormData(innerText);
            } catch (error) {
                  BrightAlert({ timeDuration: 3000, title: error.message, icon: 'warning' });
            }
      };


      console.log(Object.keys(formData).map((key) => key));



      return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
                        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
                              Order Invoice Template
                        </h2>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                              {Object.keys(formData).map((key) => (
                                    <div key={key}>
                                          <label
                                                htmlFor={key}
                                                className="block text-sm font-medium text-gray-700 mb-1"
                                          >
                                                {key.charAt(0).toUpperCase() + key.slice(1)}
                                          </label>

                                          {key === "greeting" ? (
                                                <div className="flex">
                                                      <input
                                                            id={key}
                                                            name={key}
                                                            type="text"
                                                            required
                                                            className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                            placeholder="Hello,"
                                                            value={formData[key]}
                                                            onChange={handleChange}
                                                      />
                                                      <span className="px-4 py-3 bg-gray-200 text-gray-700 rounded-r-md">
                                                            {userName}
                                                      </span>
                                                </div>
                                          ) : key === "helpMessage" ||
                                                key === "intro" ||
                                                key === "accessNotice" ? (
                                                <textarea
                                                      id={key}
                                                      name={key}
                                                      required
                                                      rows={4}
                                                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                                      value={formData[key]}
                                                      onChange={handleChange}
                                                />
                                          ) : key === "footer" || key === "message" ? (
                                                <ReactQuill
                                                      id={key}
                                                      value={formData[key]}
                                                      onChange={(value) =>
                                                            handleChange({ target: { name: key, value } })
                                                      }
                                                      className="bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                />
                                          ) : (
                                                <input
                                                      id={key}
                                                      name={key}
                                                      type="text"
                                                      required
                                                      className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                                      value={formData[key]}
                                                      onChange={handleChange}
                                                />
                                          )}
                                    </div>
                              ))}
                              <div>
                                    <button
                                          type="submit"
                                          className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                          Submit
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>

      );
};


export default Order_Template;

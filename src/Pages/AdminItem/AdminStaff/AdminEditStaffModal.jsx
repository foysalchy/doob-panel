import BrightAlert from "bright-alert";
import { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { AuthContext } from "../../../AuthProvider/UserProvider";

const AdminEditStaffModal = ({
      OpenModal,
      setOpenModal,
      staffInfo,
      refetch,
}) => {
      const [selectedValue, setSelectedValue] = useState(staffInfo?.permissions || []);
      const [roles, setRole] = useState(staffInfo?.staffRole || "");

      const options = [
            { name: "Product", route: "manage-product" },
            { name: "orders", route: "orders" },
            { name: "services", route: "services" },
            { name: "inventory", route: "inventory" },
            { name: "content", route: "content" },
            { name: "Notice", route: "seller-notice" },
            { name: "Settings", route: "settings" },
            { name: "Report", route: "admin-sales" },
            { name: "Users", route: "seller-management" },
            { name: "Help Desk", route: "support-ticket" },
            { name: "Omni Chat", route: "omnichat" },

            // Add more options as needed
      ];

      const handleChange = (selectedOption) => {
            setSelectedValue(selectedOption);
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            const user = staffInfo;

            // Ensure permissions and role are updated correctly
            const role = roles || user.staffRole;
            const permissions = selectedValue.length > 0 ? selectedValue : user.permissions;

            const data = {
                  userData: user,
                  createdAt: staffInfo?.createdAt,
                  email: staffInfo?.email,
                  name: staffInfo?.name,
                  password: staffInfo?.password,
                  staffRole: staffInfo?.staffRole,
                  role,
                  permissions,
                  userId: staffInfo?.userId,
                  verify: staffInfo?.verify,
                  _id: staffInfo?._id
            };

            console.log('staff ifo......>>>', staffInfo);
            console.log('data......>>>', data);


            fetch(`https://doob.dev/api/v1/admin/staff-role`, {
                  method: "PATCH",
                  headers: {
                        "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        if (data?.status) {
                              BrightAlert(`${data.message}`, "", "success");
                              setOpenModal(false)
                              refetch();
                        } else {
                              BrightAlert(`Something went wrong`, "", "error");
                        }
                  });
      };

      return (
            <div
                  className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 text-start py-5 ${OpenModal ? "block" : "hidden"
                        }`}
            >
                  <div className="w-full max-w-[800px] rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px]">
                        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white border border-black-b">
                              <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
                                    Update Staff
                              </div>
                              <div
                                    onClick={() => setOpenModal(!OpenModal)}
                                    className="cursor-pointer bg-gray-500 rounded-full px-2.5 mb-2 p-1 text-2xl hover:text-red-500 flex justify-center items-center h-10"
                              >
                                    <RxCross2 className="text-xl" />
                              </div>
                        </div>

                        <form
                              className="h-[300px] bar overflow-y-scroll text-start"
                              onSubmit={handleSubmit}
                        >
                              <input
                                    type="text"
                                    readOnly
                                    value={staffInfo?.name}
                                    className="w-full p-2 rounded-md ring-1 mt-2 text-green-500 ring-gray-200"
                                    placeholder="input user role"
                              />
                              <br />
                              <br />
                              <label className="" htmlFor="user">
                                    Input Role
                              </label>
                              <input
                                    defaultValue={roles}
                                    onChange={(e) => setRole(e.target.value)}
                                    type="text"
                                    className="w-full p-2 rounded-md ring-1 mt-2 ring-gray-200"
                                    placeholder="input user role"
                              />
                              <br />
                              <br />
                              <label className="" htmlFor="user">
                                    Select Permissions{" "}
                              </label>
                              <Select
                                    options={options}
                                    isMulti={true}
                                    defaultValue={selectedValue}
                                    getOptionLabel={(option) => option.name}
                                    getOptionValue={(option) => option.route}
                                    onChange={handleChange}
                              />

                              <div className="flex justify-start">
                                    <button
                                          type="submit"
                                          className="group relative inline-flex items-center bar overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4"
                                    >
                                          <span className="absolute -start-full transition-all group-hover:start-4">
                                                <svg
                                                      className="h-5 w-5 rtl:rotate-180"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      stroke="currentColor"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                      />
                                                </svg>
                                          </span>
                                          <span className="text-sm font-medium transition-all group-hover:ms-4">
                                                Update Price
                                          </span>
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );
};

export default AdminEditStaffModal;

import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import Select from "react-select";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";
import { useNavigate } from "react-router-dom";
import showAlert from "../../../Common/alert";
const AddNewStaff = () => {
      const { shopInfo } = useContext(AuthContext);
      const [searchValue, setSearchValue] = useState("");
      const [selectedValue, setSelectedValue] = useState([]);
      const [user_role, setRole] = useState("");
      const [error, setError] = useState("");
      const [value, setValue] = useState("");
      console.log(value);
      const [isNewUser, setIsNewUser] = useState(false);

      const handleSearch = () => {
            fetch(`https://doob.dev/api/v1/seller/seller-allUser?email=${searchValue}`)
                  .then((res) => res.json())
                  .then((data) => {
                        if (data?.status) {
                              setValue(data?.data);
                        } else {
                              setError(data?.message);
                        }
                  });
      };

      const options = [
            { name: "Product", route: "product-management" },
            { name: "Orders", route: "orders" },
            { name: "Inventory", route: "stock-management" },
            { name: "Pos", route: "pos" },
            { name: "Content Management", route: "content" },
            { name: "finance", route: "finance" },
            { name: "Report", route: "report" },
            { name: "Settings", route: "settings" },
            { name: "users", route: "report-management/customer-report" },
            { name: "Marketing", route: "content-management/campaign-management" },
            { name: "Support Tickets", route: "support-tickets" },
            { name: "Omni Chat", route: "user-tickets" },
            
            // Add more options as needed
      ];

      const handleChange = (selectedOption) => {
            setSelectedValue(selectedOption);
      };

      const navigate = useNavigate();

      // const handleSubmit = (e) => {
      //     e.preventDefault();
      //     const user = value;
      //     const shopEmail = shopInfo?.shopEmail
      //     const permissions = selectedValue

      //     const data = { user, shopEmail, permissions, role }
      //     fetch(`https://doob.dev/api/v1/seller/staff-add`, {
      //         method: 'PATCH',
      //         headers: {
      //             'Content-Type': 'application/json'
      //         },
      //         body: JSON.stringify(data)

      //     })
      //         .then(res => res.json())
      //         .then(data => {
      //             if (data.status) {
      //                 BrightAlert(`${data.message}`, '', "success")
      //                 navigate('/seller/staff-account')
      //             }
      //             else {
      //                 BrightAlert(`Something went wrong`, '', "error")
      //             }

      //         })
      // }

      // const handleSubmit = async (e) => {
      //     e.preventDefault();

      //     try {
      //         let userData = value;

      //         if (isNewUser) {
      //             const name = e.target.name.value;
      //             const email = e.target.email.value;
      //             const password = e.target.password.value;
      //             const userId = email.replace(/[@.]/g, '');
      //             const createdAt = new Date();

      //             const signUpResponse = await fetch(`https://doob.dev/api/v1/auth/sign-up`, {
      //                 method: "post",
      //                 headers: {
      //                     "content-type": "application/json",
      //                 },
      //                 body: JSON.stringify({ name, email, password, role, userId, createdAt }),
      //             });

      //             const signUpData = await signUpResponse.json();
      //             console.log(signUpData);

      //             if (signUpData.result) {
      //                 userData = { name, email, password, userId, role, createdAt };
      //             } else {
      //                 BrightAlert(`${signUpData.message}`, '', 'warning');
      //                 return;
      //             }
      //         }

      //         const permissions = selectedValue;
      //         const data = { userData, permissions, role };

      //         const staffRoleResponse = await fetch(`https://doob.dev/api/v1/seller/staff-add`, {
      //             method: 'PATCH',
      //             headers: {
      //                 'Content-Type': 'application/json'
      //             },
      //             body: JSON.stringify(data),
      //         });

      //         const staffRoleData = await staffRoleResponse.json();
      //         console.log(staffRoleData);
      //         BrightAlert({ timeDuration: 3000 })
      //         navigate('/seller/staff-management')

      //     } catch (error) {
      //         console.error("An error occurred:", error);
      //         BrightAlert(`An error occurred: ${error.message}`, '', "error");
      //     }
      // };

      const handleSubmit = async (e) => {
            e.preventDefault();
            let user = {};
            try {
                  // Destructure the event target for better readability
                  if (isNewUser) {
                        const { name, email, password } = e.target;

                        // Input validation
                        if (!isValidEmail(email.value)) {
                              showAlert("Please enter a valid email address", "", "warning");
                              return;
                        }

                        if (!isValidPassword(password?.value)) {
                              BrightAlert(
                                    "Password must be at least 8 characters long",
                                    "",
                                    "warning"
                              );
                              return;
                        }

                        if (isNewUser) {
                              const userId = email.value.replace(/[@.]/g, "");
                              const createdAt = new Date();

                              const signUpResponse = await fetch(
                                    `https://doob.dev/api/v1/auth/sign-up`,
                                    {
                                          method: "POST",
                                          headers: {
                                                "Content-Type": "application/json",
                                          },
                                          body: JSON.stringify({
                                                name: name.value,
                                                email: email.value,
                                                userId,
                                                phoneNumber: shopInfo.shopNumber,
                                                role: "seller",
                                                createdAt,
                                                password: password.value,
                                          }),
                                    }
                              );

                              const signUpData = await signUpResponse.json();

                              if (!signUpData.result) {
                                    BrightAlert(`${signUpData.message}`, "", "error");
                                    return;
                              }

                              // If sign-up successful, populate userData object
                              user = {
                                    name: name.value,
                                    email: email.value,
                                    oldEmail: value.email,
                              };
                        }
                  } else {
                        user = { name: value.name, email: value.email, oldEmail: value.email };
                  }

                  const permissions = selectedValue;
                  const data = {
                        user,
                        shopEmail: shopInfo?._id,
                        permissions,
                        role: user_role,
                        oldEmail: user.email,
                  };
                  console.log(data, 'user data');
                  const staffRoleResponse = await fetch(
                        `https://doob.dev/api/v1/seller/staff-add`,
                        {
                              method: "PATCH",
                              headers: {
                                    "Content-Type": "application/json",
                              },
                              body: JSON.stringify(data),
                        }
                  );

                  const staffRoleData = await staffRoleResponse.json();
                  if (staffRoleData.success) {
                        // Display success alert
                        BrightAlert("Staff added successfully", "", "success");
                        navigate("/seller/staff-account");
                  }
            } catch (error) {
                  showAlert(`An error occurred: ${error.message}`, "", "error");
            }
      };

      // Utility function for email validation
      function isValidEmail(email) {
            // Implement your email validation logic here
            return /\S+@\S+\.\S+/.test(email);
      }

      // Utility function for password validation
      function isValidPassword(password) {
            return password.length >= 8;
      }

      return (
            <div>
                  <form onSubmit={handleSubmit} className="bg-gray-100 p-4">
                        <label htmlFor="check">
                              <input
                                    type="checkbox"
                                    id="check"
                                    onChange={(e) => setIsNewUser(e.target.checked)}
                              />
                              <span className="ml-2">New User</span>
                        </label>
                        <br /> <br />
                        {isNewUser ? (
                              <div>
                                    <div className="pb-3">
                                          <div className="flex flex-col gap-3 mt-3">
                                                <label className="" htmlFor="fullname">
                                                      Input FullName
                                                </label>
                                                <input
                                                      type="text"
                                                      name="name"
                                                      id="fullname"
                                                      className="w-full p-2 rounded-md ring-1 mt-1 ring-gray-200"
                                                      placeholder="input user fullname"
                                                />
                                          </div>
                                          <div className="flex flex-col gap-3 mt-3">
                                                <label className="" htmlFor="email">
                                                      Input Email
                                                </label>
                                                <input
                                                      type="text"
                                                      name="email"
                                                      className="w-full p-2 rounded-md ring-1 mt-1 ring-gray-200"
                                                      placeholder="input user email"
                                                />
                                          </div>
                                          <div className="flex flex-col gap-3 mt-3">
                                                <label className="" htmlFor="password">
                                                      Input Password
                                                </label>
                                                <input
                                                      type="text"
                                                      name="password"
                                                      className="w-full p-2 rounded-md ring-1 mt-1 ring-gray-200"
                                                      placeholder="input user password"
                                                />
                                          </div>
                                    </div>
                              </div>
                        ) : (
                              <div className="">
                                    <label className="" htmlFor="user">
                                          Select User
                                    </label>
                                    <div className="relative pt-2 flex items-center gap-4 text-left w-full">
                                          <input
                                                id="user"
                                                type="text"
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                placeholder="Search or Select"
                                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                                          />

                                          <button
                                                className="bg-black text-white py-2 px-4"
                                                type="button"
                                                onClick={() => handleSearch()}
                                          >
                                                search
                                          </button>
                                    </div>

                                    {value?.name ? (
                                          <input
                                                type="text"
                                                readOnly
                                                value={value?.name}
                                                className="w-full p-2 rounded-md ring-1 mt-2 text-green-500 ring-gray-200"
                                                placeholder="input user role"
                                          />
                                    ) : (
                                          <input
                                                type="text"
                                                readOnly
                                                value={`${error} and search again!! `}
                                                className="w-full p-2 text-red-500 rounded-md ring-1 mt-2 ring-gray-200"
                                                placeholder="input user role"
                                          />
                                    )}
                              </div>
                        )}
                        {/* <label className='' htmlFor="user">Select User</label>
                <div className="relative pt-2 flex items-center gap-4 text-left w-full">
                    <input
                        id='user'
                        type="text"
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search or Select"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />

                    <button className='bg-black text-white py-2 px-4' type='button' onClick={() => handleSearch()}>
                        search
                    </button>
                </div>


                {value?.name ? <input type="text" readOnly value={value?.name} className="w-full p-2 rounded-md ring-1 mt-2 text-green-500 ring-gray-200" placeholder='input user role' /> : <input type="text" readOnly value={`${error} and search again!! `} className="w-full p-2 text-red-500 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role' />}
                <br /><br /> */}
                        <label className="" htmlFor="user">
                              Input Role
                        </label>
                        <input
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
                              // lassName="w-full p-2 rounded-md ring-1 mt-2 ring-gray-200" placeholder='input user role'
                              options={options}
                              isMulti={true}
                              getOptionLabel={(option) => option.name}
                              getOptionValue={(option) => option.route}
                              onChange={handleChange}
                        />
                        <input
                              className="px-12 py-2 cursor-pointer rounded-md bg-blue-500 text-white mt-6"
                              type="submit"
                              value="Add"
                        />
                  </form>
            </div>
      );
};

export default AddNewStaff;

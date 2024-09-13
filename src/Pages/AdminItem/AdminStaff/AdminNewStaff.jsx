import React, { useContext, useState } from "react";
import Select from "react-select";
import BrightAlert from "bright-alert";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useNavigate } from "react-router-dom";
import showAlert from "../../../Common/alert";

const AdminNewStaff = () => {
  const { user } = useContext(AuthContext);

  const [searchValue, setSearchValue] = useState("");
  const [selectedValue, setSelectedValue] = useState([]);
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    fetch(`https://doob.dev/api/v1/seller/seller-allUser?email=${searchValue}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "+++++++");
        if (data?.status) {
          setValue(data?.data);
        } else {
          setError(data?.message);
          setValue("");
        }
      });
  };

  const options = [
    { name: "Manage Product", route: "manage-product" },
    { name: "Orders", route: "seller-order-management" },
    { name: "Blogs", route: "blog" },
    { name: "Notice", route: "seller-notice" },
    { name: "Report", route: "admin-sales" },
    { name: "Users", route: "seller-management" },
    { name: "Manage Category", route: "manage-category" },
    { name: "Faq", route: "faq" },
    { name: "Category Management", route: "category-management" },
    { name: "Price Management", route: "price-management" },
    { name: "Page Management", route: "page-management" },
    { name: "Services", route: "services" },
    { name: "Contact", route: "contact" },
    { name: "Settings", route: "settings" },
    { name: "Support Ticket", route: "support-ticket" },
    { name: "Seller Management", route: "seller-management" },
    { name: "Warehouse", route: "warehouse" },
    { name: "Content Management", route: "content-management" },
    { name: "Staff Management", route: "staff-management" },
    { name: "Pos", route: "pos" },
    // Add more options as needed
  ];

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };

  const API_BASE_URL = "https://doob.dev";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let userData = value;

      if (isNewUser) {
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const userId = email.replace(/[@.]/g, "");
        const createdAt = new Date();

        const signUpResponse = await fetch(
          `${API_BASE_URL}/api/v1/auth/sign-up`,
          {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
              role,
              userId,
              createdAt,
            }),
          }
        );

        const signUpData = await signUpResponse.json();
        console.log(signUpData);

        if (signUpData.result) {
          userData = { name, email, password, userId, role, createdAt };
        } else {
          showAlert(`${signUpData.message}`, "", "warning");
          return;
        }
      }

      console.log("hit");
      const permissions = selectedValue;
      const data = { userData, permissions, role };

      const staffRoleResponse = await fetch(
        `${API_BASE_URL}/api/v1/admin/staff-role`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const staffRoleData = await staffRoleResponse.json();
      console.log(staffRoleData);
      showAlert("Created Success","","success");
      navigate("/admin/staff-management");
    } catch (error) {
      console.error("An error occurred:", error);
      showAlert(`An error occurred: ${error.message}`, "", "error");
    }
  };

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
                  id="fullname"
                  name="name"
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
                  className="w-full p-2 rounded-md ring-1 mt-1 ring-gray-200"
                  name="password"
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
              {/* {filteredItems.length > 0 && (
                        <div className="absolute z-10 mt-2 bg-white border rounded-md shadow-lg">
                            {filteredItems.slice(0, 10).map((item, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                    onClick={() => handleSelect(JSON.stringify(item))}
                                >
                                    {item?.name}
                                </div>
                            ))}
                        </div>
                    )} */}

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
          className="px-12 py-2 rounded-md bg-blue-500 text-white mt-6"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  );
};

export default AdminNewStaff;

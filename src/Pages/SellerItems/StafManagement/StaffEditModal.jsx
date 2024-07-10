import BrightAlert from "bright-alert";
import { useContext, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Select from "react-select";
import { AuthContext } from "../../../AuthProvider/UserProvider";

const StaffEditModal = ({ OpenModal, setOpenModal, staffInfo, refetch }) => {
  const { shopInfo } = useContext(AuthContext);
  const [selectedValue, setSelectedValue] = useState(staffInfo.permissions);
  const [role, setRole] = useState(staffInfo.staffRole);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");

  const options = [
    { name: "Manage Blogs", route: "manage-blogs" },
    { name: "Manage Contact", route: "manage-contact" },
    { name: "Manage Pages", route: "manage-pages" },
    { name: "Staff Account", route: "staff-account" },
    { name: "Support Tickets", route: "support-tickets" },
    { name: "User Tickets", route: "user-tickets" },
    { name: "Shop Profile", route: "shop-profile" },
    { name: "Domain Management", route: "domain-management" },
    { name: "Settings", route: "settings" },
    { name: "Channel Integration", route: "channel-integration" },
    { name: "Categories Management", route: "categories-management" },
    { name: "Product Management", route: "product-management" },
    { name: "Orders", route: "orders" },
    { name: "Pos", route: "pos" },
    // Add more options as needed
  ];

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldEmail = staffInfo?.email;
    let user = staffInfo;
    delete user?.shopEmail, delete user?.permissions;
    delete user?.staffRole;

    user.email = e.target.email.value;
    user.name = e.target.name.value;
    const permissions = selectedValue;

    const data = {
      user,
      shopEmail: shopInfo?._id,
      permissions,
      role: role,
      oldEmail: oldEmail,
    };

    // const data = { user, shopEmail, permissions, role, oldEmail: staffInfo?.email, email: user.email, name: name }

    fetch(`https://doob.dev/api/v1/seller/staff-add`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          BrightAlert(`${data.message}`, "", "success");
          refetch();
          setOpenModal(false);
        } else {
          BrightAlert(`Something went wrong`, "", "error");
        }
      });
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90  px-4 text-start py-5 ${
        OpenModal ? "block" : "hidden"
      }`}
    >
      <div className="w-full max-w-[800px]  rounded-[20px] bg-white pb-10 px-8 text-center md:px-[30px] ">
        <div className="flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-white ">
          <div className="pb-2 text-xl font-bold text-dark text-center sm:text-2xl">
            Update Staff
          </div>
          <div
            onClick={() => setOpenModal(!OpenModal)}
            className="cursor-pointer bg-gray-500 rounded-full py-2.5 px-2.5 mb-2 p-1 text-2xl hover:text-red-500"
          >
            <RxCross2 className="text-xl" />
          </div>
        </div>
        <hr />
        <form
          className="h-[500px] px-4 overflow-y-scroll text-start"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-3 mt-4">
            <div>
              <label className="" htmlFor="user">
                User Name{" "}
              </label>
              <input
                type="text"
                name="name"
                defaultValue={staffInfo?.name}
                className="w-full p-2 rounded-md ring-1  ring-gray-200"
                placeholder="input user role"
              />
            </div>
            <div>
              <label className="" htmlFor="user">
                User Email{" "}
              </label>
              <input
                type="text"
                name="email"
                defaultValue={staffInfo?.email}
                className="w-full p-2 rounded-md ring-1  ring-gray-200"
                placeholder="input user role"
              />
            </div>

            <div>
              <label className="" htmlFor="user">
                Role
              </label>
              <input
                defaultValue={staffInfo.staffRole}
                onChange={(e) => setRole(e.target.value)}
                type="text"
                className="w-full p-2 rounded-md ring-1  ring-gray-200"
                placeholder="input user role"
              />
            </div>
            <div>
              <label className="" htmlFor="user">
                Select Permissions{" "}
              </label>
              <Select
                // lassName="w-full p-2 rounded-md ring-1  ring-gray-200" placeholder='input user role'
                options={options}
                isMulti={true}
                defaultValue={staffInfo?.permissions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.route}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none focus:ring active:bg-gray-500 mt-4"
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
                Update Staff
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffEditModal;

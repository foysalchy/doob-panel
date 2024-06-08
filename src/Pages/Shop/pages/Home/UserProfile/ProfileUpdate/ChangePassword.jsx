import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { ShopAuthProvider } from "../../../../../../AuthProvider/ShopAuthProvide";
import Swal from "sweetalert2";

const ChangePassword = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { ChangePass, shopUser } = useContext(ShopAuthProvider);

  const [isChecked, setChecked] = useState(false);

  const handleCheckboxToggle = () => {
    setChecked(!isChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Handle form submission logic here
    const oldPass = e.target.elements.oldPass.value;
    const newPass = e.target.elements.newPass.value;
    const retypePass = e.target.elements.retypePass.value;
    if (oldPass === newPass) {
      setLoading(false);
      alert("New Password and Confirm New Password should be different");
    } else if (newPass === retypePass) {
      if (shopUser?.provider === "custom") {
        const data = {
          oldPassword: oldPass,
          newPassword: newPass,
        };
        fetch(
          `http://localhost:5001/api/v1/shop/update/change-password?token=${shopUser._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify(data),
          }
        )
          .then((response) =>
            response.json().then((result) => {
              if (response.ok) {
                console.log(result);
                Swal.fire("Success", "Password Updated", "success");
                setLoading(false);
                setOpen(false);
              } else {
                console.error(result);
                Swal.fire(
                  "Error",
                  result.message || "Failed to update password",
                  "error"
                );
                setLoading(false);
              }
            })
          )
          .catch((error) => {
            // Handle any errors
            console.error(error);
            Swal.fire("Error", `Error: ${error.message}`, "error");
          });
      } else {
        ChangePass(newPass);
        setLoading(false);
        setOpen(false);
      }
    } else {
      setLoading(false);
      alert("New password and Retype Password fields do not match.");
    }
  };

  return (
    <div className={open ? "flex" : "hidden"}>
      <div className="container mx-auto py-20">
        <div
          className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${
            open ? "block" : "hidden"
          }`}
        >
          <div className="w-full max-w-[570px] rounded-[20px] bg-white py-12 px-8 text-center md:py-[60px] md:px-[70px]">
            <h3 className="pb-2 text-xl font-bold text-dark sm:text-2xl">
              Change Password !
            </h3>
            <span
              className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-yellow-300`}
            ></span>
            <form onSubmit={handleSubmit}>
              <div className="text-start">
                <label htmlFor="oldPass">Old Password</label>
                <input
                  id="oldPass"
                  type={isChecked ? "text" : "password"}
                  className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="Enter your old password"
                />
              </div>
              <div className="text-start">
                <label htmlFor="newPass">New Password</label>
                <input
                  id="newPass"
                  type={isChecked ? "text" : "password"}
                  className="mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="text-start">
                <label htmlFor="retypePass">Retype Password</label>
                <input
                  id="retypePass"
                  type={isChecked ? "text" : "password"}
                  className="mb-2 mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
                  placeholder="Retype your new password"
                />
              </div>
              <button
                type="button"
                className="text-start flex gap-2 items-center"
                onClick={handleCheckboxToggle}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                />
                Show Password
              </button>
              <div className="flex flex-wrap mt-4 -mx-3">
                <div className="w-1/2 px-3">
                  <button
                    onClick={() => setOpen(false)}
                    className="block w-full rounded-lg border  p-3 text-center text-base border-red-500 font-medium text-black transition hover:border-red-600 hover:bg-red-600 "
                  >
                    Cancel
                  </button>
                </div>
                <div className="w-1/2 px-3">
                  <button
                    type="submit"
                    className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-green-500 disabled:blur-sm hover:bg-opacity-90`}
                  >
                    {loading ? "Loading..." : "Save Change"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

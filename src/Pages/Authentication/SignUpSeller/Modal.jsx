import BrightAlert from "bright-alert";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Modal = ({ email, modalOpen, setModalOpen }) => {
  const trigger = useRef(null);
  const modal = useRef(null);
  const navigate = useNavigate();

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const [refer, setRefer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const code = refer;
    const time = new Date().getTime();
    const data = { email, code, time };
    setLoading(true);

    fetch("https://doob.dev/api/v1/admin/refer-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert(`${data.message}`, "", "success");
        setRefer("");
        setLoading(false);
        navigate("/sign-in");
      });
  };

  return (
    <>
      <div className="container mx-auto py-20">
        <button
          ref={trigger}
          onClick={() => setModalOpen(true)}
          className={`px-6 py-3 text-base font-medium text-white rounded-full bg-primary`}
        >
          Open Modal
        </button>
        <div
          className={`fixed top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${modalOpen ? "block" : "hidden"
            }`}
        >
          <div
            ref={modal}
            onFocus={() => setModalOpen(true)}
            onBlur={() => setModalOpen(false)}
            className="w-full max-w-[570px] text-start rounded-[20px] bg-white py-12 px-8  md:py-[60px] md:px-[70px]"
          >
            <h3 className="pb-2 text-xl text-center font-bold text-dark sm:text-2xl">
              Referral Program
            </h3>
            <span
              className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
            ></span>
            <label
              htmlFor="Username"
              className="relative block py-2 mb-4 rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                value={refer}
                required
                onChange={(e) => setRefer(e.target.value)}
                type="text"
                id="Username"
                className="peer border-none px-2  bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Username"
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Refer code
              </span>
            </label>

            <div className="flex flex-wrap -mx-3">
              <div onClick={() => setModalOpen(false)} className="w-1/2 px-3">
                <button className="block w-full rounded-lg border border-red-500 p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white">
                  I don't have refer code
                </button>
              </div>
              <button
                disabled={loading}
                onClick={() => handleSubmit()}
                className="w-1/2 px-3"
              >
                <div
                  className={`block w-full p-3 text-base font-medium text-center text-white transition border rounded-lg border-primary bg-green-900 hover:bg-opacity-90`}
                >
                  {loading ? "loading..." : "Submit"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

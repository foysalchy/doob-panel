import React, { useState, useContext, useRef, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { quillModules } from "../../quillModule";
import BrightAlert from "bright-alert";
import { Timestamp } from "firebase/firestore";
import showAlert from "../../../Common/alert";

const AddSellerPage = () => {
  const [loading, setLoading] = useState(false);
  const { shopInfo, user } = useContext(AuthContext);
  const [draft, setDraft] = useState(false);

  const navigate = useNavigate();

  const dataSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const metaTag = form.metaTag.value;
    const metaDescription = form.metaDescription.value;
    // const page = form.page.value;
    const description = form.description.value;
    const faq = {
      title,
      description: description,
      shop: shopInfo.shopId,
      status: !draft,
      // page,
      metaTag,
      metaDescription,
      trash: false,
      timestamp: new Date().getTime(),
      draft, // Add draft flag
    };

    fetch(`https://doob.dev/api/v1/seller/page`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(faq),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        showAlert('Page Created','','success');

        form.reset();
        navigate("/seller/manage-pages/");
      });
  };

  return (
    <div className="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <h1 className="text-2xl font-bold text-center">Publish a Page for you</h1>
      <div className="md:p-10 p-2 border-2 rounded md:m-10 mt-3">
        <form onSubmit={dataSubmit} className="space-y-4">
          <div>
            <label className="sr-only text-black" htmlFor="title">
              Page Title
            </label>
            <input
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Title"
              type="text"
              id="title"
              name="title"
            // onChange={(e) => handleInputChange("title", e.target.value)} // for drafts
            />
          </div>
          <div>
            <label className="sr-only text-black" htmlFor="title">
              Select Page
            </label>
            <select
              name="page"
              // onChange={(e) => handleInputChange("page", e.target.value)}
              className="w-full rounded-lg border bg-white border-gray-900 p-3 text-sm"
            >
              <option value="footer1">Footer 1</option>
              <option value="footer2">Footer 2</option>
              <option value="solution">Solution</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>
          <div>
            <div className="jodit-editor">
              <JoditEditor
                config={{
                   readonly: false,height: 200,  resizable: true,
askBeforePasteHTML: false,
                  uploader: {
                    insertImageAsBase64URI: true,
                  },
                }}
                name="description"
                id="message"
              ></JoditEditor>
              {/* <ReactQuill
                name="message"
                id="message"
                className="h-36  "
                handleChange
                value={messageData}
                modules={quillModules}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Enter description here..."
              /> */}
            </div>
          </div>
          <div>
            <label className="sr-only text-black " htmlFor="metaTag">
              Meta Tag
            </label>
            <input
              required
              className="w-full mt-[4rem] sm:mt-9 rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Meta Tag"
              // onChange={(e) => handleInputChange("MetaTag", e.target.value)} // for drafts
              type="text"
              id="metaTag"
              name="metaTag"
            />
          </div>
          <div>
            <label className="sr-only text-black" htmlFor="metaTag">
              Meta Description
            </label>
            <input
              required
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Meta Description"
              type="text"
              id="metaDescription"
              // onChange={(e) =>
              //   handleInputChange("MetaDescription", e.target.value)
              // } // for drafts
              name="metaDescription"
            />
          </div>
          <div className="mt-4">
            {loading ? (
              <button
                disabled
                className="group relative cursor-not-allowed inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4"
              >
                <span className="text-sm font-medium">Loading...</span>
                <svg
                  className="animate-spin h-4 w-4 ml-3 text-white"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => setDraft(false)}
                type="submit"
                className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
              >
                <span className="absolute -end-full transition-all group-hover:end-4">
                  <BsArrowRight />
                </span>
                <span className="text-sm font-medium transition-all group-hover:me-4">
                  Upload Page
                </span>
              </button>
            )}

            <button
              onClick={() => setDraft(true)}
              type="submit"
              className="group relative inline-flex ml-4 items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
            >
              <span className="absolute -end-full transition-all group-hover:end-4">
                <BsArrowRight />
              </span>
              <span className="text-sm font-medium transition-all group-hover:me-4">
                Save and Draft
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSellerPage;

import React, { useState, useContext, useRef, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import Swal from "sweetalert2";
import JoditEditor from "jodit-react";
import { AuthContext } from "../../../AuthProvider/UserProvider";
import { useBlocker, useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { quillModules } from "../../quillModule";
import BrightAlert from "bright-alert";

const AddSellerPage = () => {
  const [loading, setLoading] = useState(false);
  const { shopInfo, user } = useContext(AuthContext);
  const [draft, setDraft] = useState(false);
  const formRef = useRef(null);

  const location = useLocation();
  const [messageData, setMessage] = useState("");


  const [formData, setFormData] = useState({
    title: "",
    page: "",
    message: "",
    MetaTag: "",
    MetaDescription: "",
    img: "",
    MetaImage: "",
    draft
  });
  const [draftSaved, setDraftSaved] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleChange = (content) => {
    setMessage(content);
    // handleInputChange("message", content); // for drafts
  };

  let blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      draftSaved && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    const isFormDataEmpty = Object.values(formData).every(
      (value) => value === ""
    );
    setDraftSaved(!isFormDataEmpty);
  }, [formData]);
  // Flag to track if user has interacted with the form

  useEffect(() => {
    if (blocker.state === "blocked") {
      console.log("yess");
      // event.preventDefault();
      // event.returnValue = ""; // Required for some browsers
      const confirmed = window.confirm(
        "Are you sure you want to leave? Your changes may not be saved."
      );
      if (confirmed) {
        const draftsAddPageData = {
          ...formData,
          // status: "drafts",
          email: user?.email,
          drafts: true,
        };
        // postPage(draftsAddPageData, "");
        console.log(draftsAddPageData);
        fetch(`https://backend.doob.com.bd/api/v1/seller/page`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(draftsAddPageData),
        })
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            BrightAlert()
            blocker.proceed();
          });

        // blocker.proceed();
      } else {
        blocker.proceed();
      }
    }
  }, [draftSaved, blocker]);


  const navigate = useNavigate()

  const dataSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const metaTag = form.metaTag.value;
    const metaDescription = form.metaDescription.value;
    const page = form.page.value;
    const description = form.description.value;
    const faq = {
      title,
      description: description,
      shop: shopInfo.shopId,
      status: true,
      page,
      metaTag,
      metaDescription,
      trash: false,
      draft, // Add draft flag
    };

    console.log('data.......', faq);

    fetch(`https://backend.doob.com.bd/api/v1/seller/page`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(faq),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        BrightAlert()
        form.reset();
        blocker.state = "unblocked";
        navigate('/seller/manage-pages/')

        // window.location.href = "/"; // Redirect to home or any other page after successful submission
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
              required
              className="w-full rounded-lg border border-gray-900 p-3 text-sm"
              placeholder="Title"
              type="text"
              id="title"
              name="title"
              onChange={(e) => handleInputChange("title", e.target.value)} // for drafts
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
                  readonly: false,
                  uploader: {
                    insertImageAsBase64URI: true,
                  },
                }}
                name="description" id="message"></JoditEditor>
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
              onChange={(e) => handleInputChange("MetaTag", e.target.value)} // for drafts
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
              onChange={(e) =>
                handleInputChange("MetaDescription", e.target.value)
              } // for drafts
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

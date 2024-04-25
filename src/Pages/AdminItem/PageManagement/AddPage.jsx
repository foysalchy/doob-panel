import JoditEditor from "jodit-react";
import React, { useContext, useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link, useBlocker } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../AuthProvider/UserProvider";

const AddPage = () => {
  const [loading, setLoading] = useState(false);

  //! for save Drafts
  const [formData, setFormData] = useState({
    title: "",
    page: "",
    message: "",
    MetaTag: "",
    MetaDescription: "",
    img: "",
    MetaImage: "",
  });
  const [draftSaved, setDraftSaved] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useContext(AuthContext);
  //! for drafts
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
        fetch(`https://backend.doob.com.bd/api/v1/admin/addpage`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(draftsAddPageData),
        })
          .then((res) => res.json())
          .then((data) => {
            setLoading(false);
            Swal.fire("Drafts Saved", "", "success");
            blocker.proceed();
          });

        // blocker.proceed();
      } else {
      }
    }
  }, [draftSaved, blocker]);

  console.log(formData);

  const dataSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const page = form.page.value;
    const description = form.description.value;
    const metaTag = form.metaTag.value;
    const metaDescription = form.metaDescription.value;
    const MetaImage = form.metaImg.files[0];

    const imageFormData = new FormData();
    imageFormData.append("image", MetaImage);
    const imageUrl = await uploadImage(imageFormData);

    const faq = {
      title,
      description,
      metaTag,
      page,
      metaDescription,
      metaImg: imageUrl,
    };

    console.log(faq);
    fetch(`https://backend.doob.com.bd/api/v1/admin/addpage`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(faq),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        Swal.fire("success", "Your Blog Publish Successfully", "success");

        form.reset();
      });
  };

  async function uploadImage(formData) {
    const url = "https://backend.doob.com.bd/api/v1/image/upload-image";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imageData = await response.json();
    if (imageData.imageUrl) {
      setFormData({ ...formData, MetaImage: imageData.imageUrl });

      return imageData.imageUrl;
    }
  }

  return (
    <div>
      <div className=" mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <h1 className="text-2xl font-bold text-center">
          Publish a Page for your
        </h1>
        <div className="p-10 border-2 rounded m-10">
          <form onSubmit={dataSubmit} className="space-y-4 ">
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
              <label className="sr-only text-black" htmlFor="page">
                Select Page
              </label>
              <select
                name="page"
                onChange={(e) => handleInputChange("page", e.target.value)}
                className="w-full rounded-lg border bg-white border-gray-900 p-3 text-sm"
              >
                <option value="footer1">Footer 1</option>
                <option value="footer2">Footer 2</option>
                <option value="solution">Solution</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
            <div>
              <div>
                <JoditEditor
                  name="description"
                  id="message"
                  onChange={handleChange}
                ></JoditEditor>
              </div>
            </div>

            <div>
              <label className="sr-only text-black" htmlFor="metaTag">
                Meta Title
              </label>
              <input
                required
                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                placeholder="Meta tag"
                onChange={(e) => handleInputChange("MetaTag", e.target.value)} // for drafts
                type="text"
                id="metaTag"
                name="metaTag"
              />
            </div>
            <div>
              <label className="sr-only text-black" htmlFor="metaDescription">
                Meta Description
              </label>
              <textarea
                required
                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                placeholder="Meta description...."
                onChange={(e) =>
                  handleInputChange("MetaDescription", e.target.value)
                } // for drafts
                type="text"
                id="metaDescription"
                name="metaDescription"
              />
            </div>

            <div>
              <label className="sr-only text-black" htmlFor="metaImg">
                Meta Image
              </label>
              <input
                required
                className="w-full rounded-lg border border-gray-900 p-3 text-sm"
                placeholder="Meta image...."
                // onChange={imageUploading}
                type="file"
                id="metaImg"
                name="metaImg"
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
                  type="submit"
                  className="group relative inline-flex items-center overflow-hidden rounded bg-gray-900 px-8 py-3 text-white focus:outline-none mt-4 "
                >
                  <span className="absolute -end-full transition-all group-hover:end-4">
                    <BsArrowRight />
                  </span>

                  <span className="text-sm font-medium transition-all group-hover:me-4">
                    Add Page
                  </span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPage;

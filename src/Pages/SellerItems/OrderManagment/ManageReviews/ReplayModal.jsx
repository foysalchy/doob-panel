import BrightAlert from "bright-alert";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

const ReplayModal = ({ refetch, setOpen, itm }) => {
  const [upload, setUpload] = useState("");
  const [uplodOk, setUploadOk] = useState(false);
  const { user } = useContext(AuthContext); // This line needs to be moved outside of handleSubmit

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentValue = e.target.comment.value;
    const body = {
      reviewId: itm?._id,
      user: user?.name,
      message: commentValue,
      image: upload,
      time: new Date(),
    };

    fetch(`https://backend.doob.com.bd/api/v1/seller/replay-on-comment`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), // Fix: Changed data to body
    })
      .then((res) => res.json())
      .then((data) => {
        BrightAlert(`${data.message}`, "", "success");
        refetch();
        setOpen(false);
      });
  };

  const imageUploading = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", selectedFile);
    const url = `https://backend.doob.com.bd/api/v1/image/upload-image`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imageData) => {
        if (imageData.imageUrl) {
          setUpload(imageData.imageUrl);
          setUploadOk(true);
        } else {
          setUpload("");
        }
      });
  };

  return (
    <div className="fixed top-0 left-0 right-0 w-screen h-screen flex items-center justify-center bg-black z-[3000]">
      <div className="bg-white px-3 pt-3 pb-5 w-[600px] relative rounded">
        <button
          onClick={() => setOpen(false)}
          className="w-[40px] h-[40px] flex items-center justify-center text-lg bg-gray-100 rounded-full absolute right-4 top-3 float-right"
        >
          x
        </button>

        <form onSubmit={handleSubmit}>
          <h1 className="text-lg text-center font-semibold">Replay Comment</h1>
          <p className="text-xs text-gray-500 text-center pb-3 border-b">
            {itm?._id}
          </p>
          <label htmlFor="comment">Comment</label>
          <input
            name="comment"
            type="text"
            placeholder="Type your replay..."
            className="w-full border px-2 py-3 mt-4 border-black rounded-md"
          />

          <label htmlFor="comment">Attachment</label>
          <input
            onChange={imageUploading}
            name="photo"
            type="file"
            placeholder="Type your replay..."
            className="w-full border px-2 py-3 mt-4 border-black rounded-md"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 mt-4 py-2 rounded"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReplayModal;

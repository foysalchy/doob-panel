import React, { useContext, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { AuthContext } from "../AuthProvider/UserProvider";
import showAlert from "../Common/alert";

const MyCustomEditor = ({ name, id,value=null }) => {
      const editorRef = useRef(null);
      const { shopInfo } = useContext(AuthContext);
      const [showCustomComponent, setShowCustomComponent] = useState(false);
      const [uploadedImage, setUploadedImage] = useState(null);
      const [imageLink, setImageLink] = useState("");
      const [isUploading, setIsUploading] = useState(false);
      const [uploadProgress, setUploadProgress] = useState(0);

      const toggleCustomComponent = () => {
            setShowCustomComponent(!showCustomComponent);
      };

      const handleDrop = (event) => {
            event.preventDefault();
            event.stopPropagation();

            const file = event.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) {
                  uploadImage(file);
            }
      };

      const handleDragOver = (event) => {
            event.preventDefault();
            event.stopPropagation();
      };

      const handleFileChange = (event) => {
            const file = event.target.files[0];
            if (file && file.type.startsWith("image/")) {
                  uploadImage(file);
            }
      };

      const uploadImage = (image) => {
            setIsUploading(true);
            setUploadProgress(0);
            const formData = new FormData();
            formData.append("image", image);

            const url = `https://doob.dev/api/v1/image/upload-image/?shopId=${shopInfo._id}`;

            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);

            xhr.upload.onprogress = (e) => {
                  if (e.lengthComputable) {
                        const percentComplete = (e.loaded / e.total) * 100;
                        setUploadProgress(percentComplete);
                  }
            };

            xhr.onload = () => {
                  if (xhr.status === 200) {
                        const imageData = JSON.parse(xhr.responseText);
                        const imageUrl = imageData.imageUrl;
                        setUploadedImage(imageUrl);
                        setImageLink(imageUrl);
                  } else {
                        console.error("Error uploading image:", xhr.statusText);
                  }
                  setIsUploading(false);
            };

            xhr.onerror = () => {
                  console.error("Error uploading image");
                  setIsUploading(false);
            };

            xhr.send(formData);
      };

      const copyToClipboard = () => {
            navigator.clipboard.writeText(imageLink).then(() => {
                  showAlert("Image link copied to clipboard", "", "success");
                  // Close the modal and reset state after copying the link
                  setShowCustomComponent(false);
                  setUploadedImage(null);
                  setImageLink("");
                  setIsUploading(false);
                  setUploadProgress(0);
            }).catch((error) => {
                  console.error("Failed to copy the image link:", error);
            });
      };


      const editorConfig = {
            readonly: false,
            height: 400, // Set initial height in pixels
            resizable: true,
            askBeforePasteHTML: false,
            extraButtons: [
                  {
                        name: "customComponentButton",
                        tooltip: "Upload Image",
                        iconURL: "https://w7.pngwing.com/pngs/527/625/png-transparent-scalable-graphics-computer-icons-upload-uploading-cdr-angle-text-thumbnail.png",
                        exec: toggleCustomComponent,
                  },
            ],
      };

      return (
            <div className="relative jodit-editor">
                  <JoditEditor ref={editorRef} config={editorConfig} name={name} id={id} value={value}   style={{
    resize: 'both', // Allow both horizontal and vertical resizing
    overflow: 'auto', // Allow scroll if content overflows
    minHeight: '100px', // Set minimum height
    maxHeight: '1000px', // Set maximum height
  }}/>
                  {showCustomComponent && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                              <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
                                    <div className="flex justify-between items-center bg-gray-100 px-6 py-4">
                                          <h3 className="text-xl font-semibold text-gray-800">
                                                Upload an Image
                                          </h3>
                                          <button
                                                type="button"
                                                onClick={() => setShowCustomComponent(false)}
                                                className="text-gray-600 hover:text-gray-800 focus:outline-none transition-colors duration-200"
                                                aria-label="Close upload panel"
                                          >
                                                <svg
                                                      className="w-6 h-6"
                                                      fill="none"
                                                      stroke="currentColor"
                                                      viewBox="0 0 24 24"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                >
                                                      <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M6 18L18 6M6 6l12 12"
                                                      />
                                                </svg>
                                          </button>
                                    </div>
                                    <div className="p-6">
                                          <div
                                                className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center cursor-pointer transition-all duration-200 ease-in-out hover:border-blue-500 hover:bg-blue-50"
                                                onDrop={handleDrop}
                                                onDragOver={handleDragOver}
                                          >
                                                <svg
                                                      className="mx-auto h-16 w-16 text-gray-400"
                                                      stroke="currentColor"
                                                      fill="none"
                                                      viewBox="0 0 48 48"
                                                      aria-hidden="true"
                                                >
                                                      <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                      />
                                                </svg>
                                                <p className="mt-4 text-lg text-gray-600">
                                                      <span className="font-medium text-blue-600 hover:text-blue-500">
                                                            Click to upload
                                                      </span>{" "}
                                                      or drag and drop
                                                </p>
                                                <p className="mt-2 text-sm text-gray-500">
                                                      PNG, JPG, GIF up to 10MB
                                                </p>
                                          </div>
                                          <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                id="file-upload"
                                          />
                                          <label
                                                htmlFor="file-upload"
                                                className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                          >
                                                Select a file
                                          </label>
                                          {isUploading && (
                                                <div className="mt-4">
                                                      <div className="relative pt-1">
                                                            <div className="flex mb-2 items-center justify-between">
                                                                  <div>
                                                                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                                                                              Uploading
                                                                        </span>
                                                                  </div>
                                                                  <div className="text-right">
                                                                        <span className="text-xs font-semibold inline-block text-blue-600">
                                                                              {Math.round(uploadProgress)}%
                                                                        </span>
                                                                  </div>
                                                            </div>
                                                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                                                                  <div
                                                                        style={{ width: `${uploadProgress}%` }}
                                                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-300 ease-out"
                                                                  ></div>
                                                            </div>
                                                      </div>
                                                </div>
                                          )}
                                          {uploadedImage && (
                                                <div className="mt-6 text-center">
                                                      <img
                                                            src={uploadedImage}
                                                            alt="Uploaded Preview"
                                                            className="w-32 h-32 object-cover rounded-lg mx-auto mb-4 shadow-md"
                                                      />
                                                      <div className="flex items-center justify-center space-x-4">
                                                            <button
                                                                  type="button"
                                                                  onClick={copyToClipboard}
                                                                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
                                                            >
                                                                  Copy Link
                                                            </button>

                                                      </div>
                                                </div>
                                          )}
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
};

export default MyCustomEditor;

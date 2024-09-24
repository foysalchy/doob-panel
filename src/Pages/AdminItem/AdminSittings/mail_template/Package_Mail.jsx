import { useState, useRef, useCallback, useEffect } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useDropzone } from 'react-dropzone'
import { useQuery } from '@tanstack/react-query'
import BrightAlert from 'bright-alert'

const Package_Mail = () => {

      const {
            data: innerText = {},
            isLoading: innerText_loading,
            refetch,
      } = useQuery({
            queryKey: ["innerText"],
            queryFn: async () => {
                  const res = await fetch(
                        `http://localhost:5001/api/v1/admin/mail-template?status=package_template`
                  );
                  const data = await res.json();
                  console.log(data);
                  return data;
            },
      });


      





      const [formData, setFormData] = useState({
            gratings: innerText.gratings ?? '',
            note: innerText.note ?? '',
      })

      useEffect(() => {
            setFormData({
                  gratings: innerText.gratings ?? '',
                  note: innerText.note ?? '',
            })

      }, [innerText]);

      const [image, setImage] = useState(null)
      const [preview, setPreview] = useState(null)

      const handleChange = (e) => {
            const { name, value } = e.target
            setFormData(prevData => ({
                  ...prevData,
                  [name]: value
            }))
      }

      const handleNoteChange = (content) => {
            setFormData(prevData => ({
                  ...prevData,
                  note: content
            }))
      }

      const onDrop = useCallback((acceptedFiles) => {
            if (acceptedFiles && acceptedFiles) {
                  const file = acceptedFiles[0]
                  setImage(file)
                  const reader = new FileReader()
                  reader.onloadend = () => {
                        setPreview(reader.result)
                  }
                  reader.readAsDataURL(file)
            }
      }, [])

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
            accept: { 'image/*': [] },
            multiple: false
      })

      const handleSubmit = async (e) => {
            e.preventDefault()
            console.log('Form submitted:', { ...formData, image })
            const status = 'package_template';
            const data = {
                  ...formData,
                  status,

            }
            try {
                  const response = await fetch('http://localhost:5001/api/v1/admin/template-update', {
                        method: 'PATCH', // or 'PUT' depending on your needs
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                  });

                  if (!response.ok) {
                        throw new Error('Network response was not ok');
                  }

                  const result = await response.json();

                  console.log(result); // Handle the response as needed
                  BrightAlert({ timeDuration: 3000, title: result.message, icon: 'success' });

                  // Reset form data to original innerText or any other action you want to perform
                  setFormData(innerText);
            } catch (error) {
                  BrightAlert({ timeDuration: 3000, title: error.message, icon: 'warning' });
            }
      }

      return (
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
                  <h2 className="text-3xl font-bold mb-6 text-gray-800"> Order Mail Template </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                              <label htmlFor="gratings" className="block text-sm font-medium text-gray-700 mb-1">
                                    Gratings
                              </label>
                              <input
                                    type="text"
                                    id="gratings"
                                    name="gratings"
                                    value={formData.gratings}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                                    required
                              />
                        </div>
                        {/* <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload Image
                              </label>
                              <div
                                    {...getRootProps()}
                                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-400 transition duration-150 ease-in-out ${isDragActive ? 'border-blue-500 bg-blue-50' : ''}`}
                              >
                                    <input {...getInputProps()} />
                                    <div className="space-y-1 text-center">
                                          <svg
                                                className="mx-auto h-12 w-12 text-gray-400"
                                                stroke="currentColor"
                                                fill="none"
                                                viewBox="0 0 48 48"
                                                aria-hidden="true"
                                          >
                                                <path
                                                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                      strokeWidth={2}
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                />
                                          </svg>
                                          <div className="flex text-sm text-gray-600">
                                                <label
                                                      htmlFor="file-upload"
                                                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                                >
                                                      <span>Upload a file</span>
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                          </div>
                                          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                              </div>
                              {preview && (
                                    <div className="mt-3">
                                          <img src={preview} alt="Preview" className="max-w-full h-auto rounded-md" />
                                    </div>
                              )}
                        </div> */}
                        <div>
                              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
                                    Note
                              </label>
                              <ReactQuill
                                    theme="snow"
                                    value={formData.note}
                                    onChange={handleNoteChange}
                                    className="bg-white"
                              />
                        </div>
                        <div className="bg-blue-50 p-4 rounded-md">
                              <p className="text-sm text-blue-800">
                                    <span className="font-semibold">Help:</span> Fill in the gratings and add any additional notes using the rich text editor.
                              </p>
                        </div>
                        <button
                              type="submit"
                              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                        >
                              Submit
                        </button>
                  </form>
            </div>
      )
}

export default Package_Mail;

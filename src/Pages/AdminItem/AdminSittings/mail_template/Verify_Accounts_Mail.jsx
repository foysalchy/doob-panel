import { useState, FormEvent, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Verify_Accounts_Mail = () => {
      const [formData, setFormData] = useState({
            subject: '',
            header: '',
            body: '',
            footer: ''
      });

      const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevData => ({
                  ...prevData,
                  [name]: value
            }));
      };

      const handleQuillChange = (value) => {
            setFormData(prevData => ({
                  ...prevData,
                  body: value
            }));
      };

      const handleSubmit = (e) => {
            e.preventDefault();
            console.log('Form submitted:', formData);
            // Reset the form after submission
            setFormData({ subject: '', header: '', body: '', footer: '' });
      };

      const modules = useMemo(() => ({
            toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image'],
                  ['clean']
            ],
      }), []);

      return (
            <div className="min-h-screen bg-gray-100 flex  justify-center py-12 px-4 sm:px-6 lg:px-8">
                  <div className="">
                        <div>
                              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Verify Mail Template
                              </h2>
                        </div>
                        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                              <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                          <label htmlFor="subject" className="sr-only">Subject</label>
                                          <input
                                                id="subject"
                                                name="subject"
                                                type="text"
                                                required
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                placeholder="Subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                          />
                                    </div>
                                    <div className="relative">
                                          <label htmlFor="header" className="sr-only">Header</label>
                                          <input
                                                id="header"
                                                name="header"
                                                type="text"
                                                required
                                                className="appearance-none rounded-none block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                placeholder="Header"
                                                value={formData.header}
                                                onChange={handleChange}
                                          />
                                          <span className="absolute right-3 top-2 text-gray-500 pointer-events-none">user_name</span>
                                    </div>
                                    <div className="rounded-md shadow-sm -mt-4">
                                          <label htmlFor="body" className="sr-only">Body</label>
                                          <ReactQuill
                                                theme="snow"
                                                value={formData.body}
                                                onChange={handleQuillChange}
                                                modules={modules}
                                                className="bg-white"
                                          />
                                    </div>
                                    <div className="rounded-md shadow-sm ">
                                          <div>
                                                <label htmlFor="footer" className="sr-only">Footer</label>
                                                <input
                                                      id="footer"
                                                      name="footer"
                                                      type="text"
                                                      required
                                                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                                      placeholder="Footer"
                                                      value={formData.footer}
                                                      onChange={handleChange}
                                                />
                                          </div>
                                    </div>
                              </div>





                              <div>
                                    <button
                                          type="submit"
                                          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                          Submit
                                    </button>
                              </div>
                        </form>
                  </div>
            </div>
      );

};

export default Verify_Accounts_Mail;

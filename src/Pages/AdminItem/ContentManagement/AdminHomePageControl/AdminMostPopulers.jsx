import React, { useEffect, useState } from 'react';
import CmsTitle from './CmsTitle';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const AdminMostPopulers = ({ setMostPopular }) => {
      const [on, setOn] = useState(false);
      const [title, setTitle] = useState('')
      const [description, setDescription] = useState('')
      const [data, setData] = useState([]);


      const addItems = () => {
            setData([...data, {
                  id: data.length + 1,
                  title: title,
                  description: description
            }]);

            setTitle('');
            setDescription('');
      }

      useEffect(() => {
            setMostPopular(data)

      }, [data, description, setMostPopular, title])

      return (
            <div>
                  <section
                        style={{
                              transition: 'all 0.3s ease-in-out',
                        }}
                        className={`border bar overflow-hidden rounded ${on ? 'max-h-[1000px]' : 'max-h-[60px]'} cursor-pointer `}>
                        <header
                              onClick={() => setOn(!on)}
                              className='bg-gray-100 md:p-4 p-2 flex items-center justify-between'>
                              <CmsTitle text="Most Popular Features" />
                              <span
                                    className='text-gray-500'>
                                    {!on ? <FaAngleDown /> : <FaAngleUp />}
                              </span>
                        </header>
                        <figure
                              className='bg-gray-50 p-3'
                        >
                              <div className="form-group flex flex-col gap-2">

                                    <div className="grid grid-cols-3 gap-3">
                                          <div className="cart border p-6 rounded duration-150 hover:shadow-md">
                                                <h3 className="text-md border-b mb-3 pb-2 text-center font-semibold">
                                                      Add Features
                                                </h3>

                                                <div className='flex flex-col gap-2'>
                                                      <input
                                                            onChange={(e) => setTitle(e.target.value)}
                                                            value={title}
                                                            type="text"
                                                            className='bg-gray-100 text-black border rounded-lg border-gray-500 px-2 py-2'
                                                            placeholder='Feature Title'
                                                            name="fTitle" />
                                                </div>

                                                <div className='flex flex-col gap-2 mt-6'>
                                                      <textarea
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            value={description}
                                                            type="text"
                                                            className='bg-gray-100 text-black border rounded-lg border-gray-500 px-2 py-2'
                                                            placeholder='Feature Description'
                                                            name="fDescription" />
                                                </div>

                                                <button onClick={addItems} className='mt-3 bg-gray-900 w-full text-white px-6 py-2 rounded'>+ Add</button>
                                          </div>

                                          <div className='col-span-2'>
                                                <>
                                                      {/* component */}
                                                      <div className="">
                                                            <div className="w-full bar overflow-hidden rounded-md border">
                                                                  <div className="w-full bar overflow-x-auto">
                                                                        <table className="w-full">
                                                                              <thead>
                                                                                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                                                                          <th className="px-4 py-3 border-b border-black">Title</th>
                                                                                          <th className="px-4 py-3 border-b border-black">Description</th>
                                                                                          <th className="px-4 py-3 border-b border-black">Action</th>
                                                                                    </tr>
                                                                              </thead>
                                                                              <tbody className="bg-white">
                                                                                    {!data.length < 1 ?
                                                                                          data?.map(itm => <tr key={itm?.id} className="text-gray-700">
                                                                                                <td className="px-4 w-[200px] py-3 border">
                                                                                                      <div className="flex items-center text-sm">
                                                                                                            <p className="text-xs text-gray-600">{itm?.title}</p>
                                                                                                      </div>
                                                                                                </td>
                                                                                                <td className="px-4 py-3 w-[400px] border">
                                                                                                      <p className="text-xs text-gray-600">
                                                                                                            {itm?.description}
                                                                                                      </p>
                                                                                                </td>
                                                                                                <td className="px-4 py-3 flex items-center gap-2 ">
                                                                                                      <button className="text-red-600 bg-[#ff00482b] duration-150 hover:bg-[#ff004861] px-4 py-1 text-sm rounded-md">
                                                                                                            Delete
                                                                                                      </button>
                                                                                                      <button className="text-blue-600 bg-[#0088ff2b] duration-150 hover:bg-[#005eff61] px-4 py-1 text-sm rounded-md">
                                                                                                            Edit
                                                                                                      </button>
                                                                                                </td>
                                                                                          </tr>)
                                                                                          :
                                                                                          <tr className='h-[300px] bg-gray-50'>
                                                                                                <td colSpan="3" className="text-center py-4">No Data Found</td>
                                                                                          </tr>
                                                                                    }


                                                                              </tbody>
                                                                        </table>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </>
                                          </div>
                                    </div>

                              </div>
                        </figure>
                  </section>

            </div>
      );
};

export default AdminMostPopulers;

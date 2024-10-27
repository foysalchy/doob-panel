import React from 'react';
import { RxCross2 } from 'react-icons/rx';

const ShowPreview = ({ status, setStatus }) => {
      console.log(status, 'warehouse_data');
      return (
            <div>
                  <div className={`fixed z-50 top-0 left-0 flex h-full min-h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-5 ${status ? "block" : "hidden"}`}>
                        <div className="w-full max-w-[90%]  rounded-[20px] bg-white pb-10 text-center ">
                              <div className='flex justify-between z-50 pt-4 items-start w-full sticky top-0 bg-gray-800 border-b border-gray-300 rounded-t-[18px] px-10'>
                                    <div className='pb-2 text-xl font-bold text-white text-center sm:text-2xl'>{status.data.warehouse}</div>
                                    <div onClick={() => setStatus(false)} className='cursor-pointer bg-gray-300 rounded-full  mb-2 p-2 text-2xl hover:bg-gray-400'>
                                          <RxCross2 className='text-xl' />
                                    </div>
                              </div>

                              <div className='max-h-[100vh] px-10 text-start bar overflow-y-scroll  pt-10' >

                                    {status?.data?.areas.map((area) => (
                                          <ul key={area.area} className="border border-gray-300 rounded p-2 mb-4">
                                                <li className="font-semibold">{area.area}</li>
                                                <ul className="ml-4">
                                                      {status?.data?.racks
                                                            .filter((rack) => rack.area === area.area)
                                                            .map((rack) => (
                                                                  <li key={rack.rack} className="px-2 py-1">
                                                                        <span className="font-medium">R=&gt; </span> {rack.rack}
                                                                        <ul className="ml-4">
                                                                              {status?.data?.selfs
                                                                                    .filter((self) => self?.rack === rack?.rack)
                                                                                    .map((self) => (
                                                                                          <li key={self.self} className="px-2 py-1">
                                                                                                <span className="font-medium">S=&gt;</span> {self.self}
                                                                                                <ul className="ml-4">
                                                                                                      {status?.data?.cells
                                                                                                            .filter((cell) => cell?.self === self?.self)
                                                                                                            .map((cel) => (
                                                                                                                  <li key={cel.cell} className="px-2 py-1">
                                                                                                                        <span className="font-medium">C=&gt;</span> {cel.cell}
                                                                                                                  </li>
                                                                                                            ))}
                                                                                                </ul>
                                                                                          </li>
                                                                                    ))}
                                                                        </ul>
                                                                  </li>
                                                            ))}
                                                </ul>
                                          </ul>
                                    ))}


                              </div>
                        </div>
                  </div>
            </div>
      );
};
export default ShowPreview;

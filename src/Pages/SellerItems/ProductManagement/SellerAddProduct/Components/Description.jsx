import React from 'react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { quillModules } from '../../../../quillModule';
import JoditEditor from 'jodit-react';

const Description = ({ }) => {






      return (
            <div className=' border mt-4 border-gray-400 md:px-10 px-3 py-5 md:pb-16 pb-20 w-full bg-gray-100 rounded'>
                  <div className='flex flex-col'>
                        <span className='font-bold'>Product Description</span>
                        <small>Having accurate product information raises discoverability.</small>
                  </div>

                  <div>
                        <div className='flex flex-col mt-3'>
                              <span>Product Highlight <span className='text-red-500'> *</span></span>
                        </div>


                        <JoditEditor
                              id="aboutText3 "
                              name="short_description"

                              config={{
                                    readonly: false, height: 200, resizable: true,
                                    askBeforePasteHTML: false,
                                    uploader: {
                                          insertImageAsBase64URI: true,
                                    },

                              }}

                        />
                  </div>
                  <div className=' py-2'>
                        <div className='flex flex-col mt-3'>
                              <span>Product  Description <span className='text-red-500'> *</span></span>

                        </div>
                        <JoditEditor
                              id="description "
                              name="description"
                              config={{
                                    readonly: false, height: 200, resizable: true,
                                    askBeforePasteHTML: false,
                                    uploader: {
                                          insertImageAsBase64URI: true,
                                    },
                              }}
                        />
                  </div>

            </div>
      );
};

export default Description;

import React, { useState } from 'react';
import CmsTitle from './CmsTitle';
import JoditEditor from 'jodit-react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const AdminHowWeWork = ({ setHowWeWorksData }) => {
      const [on, setOn] = useState(false);
      const [value, setValue] = useState('');

      const handleValue = (data) => {
            setValue(value);
            setHowWeWorksData(data);
      }
      return (
            <section
                  style={{
                        transition: 'all 0.3s ease-in-out',
                  }}
                  className={`border bar overflow-hidden rounded ${on ? 'max-h-[1000px]' : 'max-h-[60px]'} cursor-pointer `}>
                  <header
                        onClick={() => setOn(!on)}
                        className='bg-gray-100 md:p-4 p-2 flex items-center justify-between'>
                        <CmsTitle text="How We Work" />
                        <span
                              className='text-gray-500'>
                              {!on ? <FaAngleDown /> : <FaAngleUp />}
                        </span>
                  </header>
                  <figure
                        className='bg-gray-50 p-3'
                  >
                        <div>
                              <JoditEditor
                                    id="howWeWork"
                                    name="howWeWork"
                                    className='mt-2'
                                    onChange={handleValue}
                                    value={value}
                                    tabIndex={1}
                                    config={{
                                          readonly: false, height: 200, resizable: true,
                                          askBeforePasteHTML: false,
                                          uploader: {
                                                insertImageAsBase64URI: true,
                                          },
                                    }}
                              />
                        </div>
                  </figure>
            </section>

      );
};

export default AdminHowWeWork;

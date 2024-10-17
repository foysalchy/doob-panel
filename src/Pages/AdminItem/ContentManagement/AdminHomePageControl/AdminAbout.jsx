import JoditEditor from 'jodit-react';
import React, { useEffect, useState } from 'react';
import CmsTitle from './CmsTitle';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

const AdminAbout = ({ setAboutData }) => {
    const [on, setOn] = useState(false);
    const [value, setValue] = useState({
        content1: {
            text: '',
            img: ''
        },
        content2: {
            text: '',
            img: ''
        },
        content3: {
            text: '',
            img: ''
        },
    });

    useEffect(() => {
        setAboutData(value);
    }, [value, setAboutData]);


    return (
        <section
            style={{
                transition: 'all 0.3s ease-in-out',
            }}
            className={`border overflow-hidden rounded ${on ? 'max-h-[1000px]' : 'max-h-[60px]'} cursor-pointer `}>
            <header
                onClick={() => setOn(!on)}
                className='bg-gray-100 md:p-4 p-2 flex items-center justify-between'>
                 <CmsTitle text=" About Us Section"/>
                <span
                    className='text-gray-500'>
                    {!on ? <FaAngleDown /> : <FaAngleUp />}
                </span>
            </header>
            <figure
                className='bg-gray-50 p-3'
            >
                <div>
                    <h3
                        className='text-md border-b pb-2 capitalize font-semibold'
                    >
                        Part 1
                    </h3>
                    <div className='grid mt-4 grid-cols-2 gap-3'>
                        <div className="form-group flex flex-col gap-2">
                            <div className="relative overflow-hidden h-[200px] rounded-lg bg-gray-100 flex items-center justify-center items">
                                <label htmlFor='img-1' className="absolute right-0 bottom-0 flex items-center justify-center top-0 left-0  m-auto z-[100] text-black">Upload image</label>
                                <input id="img-1" className='bg-gray-100  absolute -top-20 left-0 right-0 bottom-0 w-[100%]' type="file" name="aboutImg1" />
                            </div>
                        </div>
                        <div className="form-group flex flex-col gap-2">
                            <JoditEditor
                                id="omniChannel1 "
                                name="omniChannel1 "
                                className=''
                                onChange={(newContent) => {
                                    setValue({ ...value, content1: { ...value.content1, text: newContent } });
                                }}
                                value={value.content1.text}
                                tabIndex={1}
                                config={{
                                     readonly: false,height: 200,  resizable: true,
askBeforePasteHTML: false,
                                    uploader: {
                                        insertImageAsBase64URI: true,
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <br />
                    {/* about content 2 */}
                    <h3
                        className='text-md border-b pb-2 capitalize font-semibold'
                    >
                        Part 2
                    </h3>
                    <div className='grid mt-4 grid-cols-2 gap-3'>

                        <div className="form-group flex flex-col gap-2">
                            <JoditEditor
                                id="aboutText2 "
                                name="aboutText2 "
                                className=''
                                onChange={(newContent) => {
                                    setValue({ ...value, content2: { ...value.content2, text: newContent } });
                                }}
                                value={value.content2.text}
                                tabIndex={1}
                                config={{
                                     readonly: false,height: 200,  resizable: true,
askBeforePasteHTML: false,
                                    uploader: {
                                        insertImageAsBase64URI: true,
                                    },
                                }}
                            />
                        </div>

                        <div className="form-group flex flex-col gap-2">
                            <div className="relative overflow-hidden h-[200px] rounded-lg bg-gray-100 flex items-center justify-center items">
                                <label htmlFor='img-1' className="absolute right-0 bottom-0 flex items-center justify-center top-0 left-0  m-auto z-[100] text-black">Upload image</label>
                                <input id="img-1" className='bg-gray-100  absolute -top-20 left-0 right-0 bottom-0 w-[100%]' type="file" name="aboutImg1" />
                            </div>
                        </div>

                    </div>
                    <br />
                    <h3
                        className='text-md border-b pb-2 capitalize font-semibold'
                    >
                        Part 3
                    </h3>
                    {/* about content 1 */}
                    <div className='grid mt-4 grid-cols-2 gap-3'>
                        <div className="form-group flex flex-col gap-2">
                            <div className="relative overflow-hidden h-[200px] rounded-lg bg-gray-100 flex items-center justify-center items">
                                <label
                                    htmlFor='img-3'
                                    className="absolute right-0 bottom-0 flex items-center justify-center top-0 left-0  m-auto z-[100] text-black">
                                    Upload image
                                </label>

                                <input
                                    id="img-3"
                                    className='bg-gray-100  absolute -top-20 left-0 right-0 bottom-0 w-[100%]'
                                    type="file"
                                    name="aboutImg1" />
                            </div>
                        </div>

                        <div className="form-group flex flex-col gap-2">
                            <JoditEditor
                                id="aboutText3 "
                                name="aboutText3 "
                                className=''
                                onChange={(newContent) => {
                                    setValue({ ...value, content3: { ...value.content3, text: newContent } });
                                }}
                                value={value.content1.text}
                                tabIndex={1}
                                config={{
                                     readonly: false,height: 200,  resizable: true,
askBeforePasteHTML: false,
                                    uploader: {
                                        insertImageAsBase64URI: true,
                                    },
                                }}
                            />
                        </div>
                    </div>

                </div>

            </figure>
        </section>

    );
};

export default AdminAbout;
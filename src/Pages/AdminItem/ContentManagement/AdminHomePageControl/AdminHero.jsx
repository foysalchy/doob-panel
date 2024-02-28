import { useState } from 'react';
import JoditEditor from 'jodit-react';
import { FaAngleUp, FaAngleDown } from "react-icons/fa6";
import CmsTitle from './CmsTitle';

const AdminHero = ({ setHomeContent }) => {
    const [content, setContent] = useState('');
    const [on, setOn] = useState(false);

    // Function to handle content change
    const handleContentChange = (newContent) => {
        setContent(newContent);
        setHomeContent(newContent); // Update the parent component's state
    };

    return (
        <>
            <section
                style={{
                    transition: 'all 0.3s ease-in-out',
                }}
                className={`border overflow-hidden rounded ${on ? 'max-h-[1000px]' : 'max-h-[60px]'} cursor-pointer `}>
                <header
                    onClick={() => setOn(!on)}
                    className='bg-gray-100 md:p-4 p-2 flex items-center justify-between'>
                    <CmsTitle text=" Hero Section" />
                    <span
                        className='text-gray-500'>
                        {!on ? <FaAngleDown /> : <FaAngleUp />}
                    </span>
                </header>
                <figure
                    className='bg-gray-50 p-3'
                >
                    <div>

                        <div className="form-group flex flex-col gap-2">


                            <JoditEditor
                                id="heroContent1"
                                name="heroContent"
                                value={content} // Set the value prop
                                onChange={handleContentChange} // Use the function to handle change
                                tabIndex={1}
                                config={{
                                    readonly: false,
                                    uploader: {
                                        insertImageAsBase64URI: true,
                                    },
                                }}
                            />
                        </div>
                    </div>
                </figure>
            </section>

        </>
    );
};

export default AdminHero;

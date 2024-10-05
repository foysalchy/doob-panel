import JoditEditor from "jodit-react";
import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import CmsTitle from "./CmsTitle";

const AdminOmniChat = ({ setOmniChat }) => {
    const [on, setOn] = useState(false);
    const [value, setValue] = useState('');
    const handleContentChange = (newContent) => {
        setValue(newContent);
        setOmniChat(newContent);
    };
    return (
        <div>
            <section
                style={{
                    transition: 'all 0.3s ease-in-out',
                }}
                className={`border overflow-hidden rounded ${on ? 'max-h-[1000px]' : 'max-h-[60px]'} cursor-pointer `}>
                <header
                    onClick={() => setOn(!on)}
                    className='bg-gray-100 md:p-4 p-2 flex items-center justify-between'>
                    <CmsTitle text=" Omni Channel Content"/>
                    <span
                        className='text-gray-500'>
                        {!on ? <FaAngleDown /> : <FaAngleUp />}
                    </span>
                </header>
                <figure
                    className='bg-gray-50 p-3'
                >
                    <div className="form-group flex flex-col gap-2">
                        <JoditEditor
                            id="omniChannel2 "
                            name="omniChannel2 "
                            className=''
                            onChange={handleContentChange}
                            value={value}
                            tabIndex={1}
                            config={{
                                 readonly: false,height: 200,resizable: true,
                                uploader: {
                                    insertImageAsBase64URI: true,
                                },
                            }}
                        />
                    </div>
                </figure>
            </section>


        </div>
    );
};

export default AdminOmniChat;
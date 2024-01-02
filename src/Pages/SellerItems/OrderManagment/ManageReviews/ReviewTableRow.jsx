import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { Link } from 'react-router-dom';
import ReportModal from './ReportModal';

const ReviewTableRow = () => {
    const { reviewCheckUpData, setReviewCheckUpData } = useContext(AuthContext);
    const [openModal, setOpenModal] = useState(false);

    return (
        <tr className="border-b dark:border-neutral-500">
            <ReportModal openModal={openModal} setOpenModal={setOpenModal} />
            <td className="whitespace-wrap border-r w-[170px] px-2 py-4 font-medium dark:border-neutral-500">
                <Link to="" className="text-blue-600">019384354444445</Link>
            </td>
            <td className="whitespace-wrap w-[320px] border-r px-6 py-4 dark:border-neutral-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias, officia. Minima numquam modi asperiores beatae, ut ipsam sapiente aspernatur, earum ipsa est doloribus inventore accusantium dolore sit cumque, quam atque!
            </td>
            <td className="whitespace-wrap border-r px-6 py-4 dark:border-neutral-500">
                <Link to="" className='text-blue-700'>DARK MSB-10 Best Beginner choice Premium Acoustic Guitar + Picks - Black</Link>
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">Not replied</td>
            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                <button openModal={openModal} setOpenModal={setOpenModal} className="text-blue-500">Report</button>
            </td>
        </tr>
    );
};

export default ReviewTableRow;
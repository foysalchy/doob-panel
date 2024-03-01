import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../../AuthProvider/UserProvider';
import { Link } from 'react-router-dom';
import ReportModal from './ReportModal';
import ReplayModal from './ReplayModal';
import BrightAlert from 'bright-alert';

const ReviewTableRow = ({ refetch, itm }) => {
    const { reviewCheckUpData, setReviewCheckUpData } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleDelete = () => {
        fetch(`http://localhost:5001/api/v1/seller/delete-comment?id=${itm?._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                BrightAlert(`${data.message}`, '', "success");
                refetch();

            });
    }
    return (
        <tr className="border-b dark:border-neutral-500">
            <ReportModal openModal={openModal} setOpenModal={setOpenModal} />

            <td className="whitespace-wrap border-r w-[170px] px-2 py-4 font-medium dark:border-neutral-500">
                <Link to="" className="text-blue-600">{itm?._id}</Link>
            </td>
            <td className="whitespace-wrap w-[320px] border-r px-6 py-4 dark:border-neutral-500">
                {itm?.comment}
            </td>
            <td className="whitespace-wrap border-r px-6 py-4 dark:border-neutral-500">
                {itm?.rating}
            </td>
            <td className="whitespace-nowrap border-r px-6 py-4 dark:border-neutral-500">
                <img src={itm?.photo?.image} className="w-20 h-20 mx-auto" alt="" />
            </td>
            <td className="whitespace-nowrap px-6 py-4 dark:border-neutral-500 flex gap-3 justify-center items-center">
                <button onClick={handleDelete} className="text-red-500">Delete</button>

                <button onClick={() => setOpen(itm)} className="text-blue-500">Replay</button>
            </td>
            {open?._id === itm?._id && <ReplayModal refetch={refetch} itm={itm} setOpen={setOpen} />}
        </tr>
    );
};

export default ReviewTableRow;
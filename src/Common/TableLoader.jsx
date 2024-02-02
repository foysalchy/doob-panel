import React from 'react';

const TableLoader = ({ colSpan }) => {
    return (
        <td colSpan={colSpan} className='w-full'>
            <div className="loader w-full">
                <div className="loader-inner"></div>
            </div>
        </td>

    );
};

export default TableLoader;
import React, { useState } from 'react';
import OrderTable from './DarazOrderTable';
import ExportModal from './ExportModal';
import DarazOrderTable from './DarazOrderTable';
import { DarazOrdersNav } from './ManageDarazOrderNavData';

// import OrderTable from './OrderTable';

const ManageDarazOrder = () => {
    const [selectedValue, setSelectedValue] = useState('Pending');


    return (
        <div>
            <div className='mt-12'>
                {/* table */}
               
            </div>
        </div>
    );
};

export default ManageDarazOrder;

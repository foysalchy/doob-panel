import React from 'react';
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy } from '@dnd-kit/sortable';
import DragImg from './DragImg';

const DragImgBox = ({ task }) => {

    return (
             <SortableContext items={task} strategy={horizontalListSortingStrategy}>
                {
                    task?.map(task => <div key={task?.id}>
                        <DragImg id={task?.id} task={task?.title} />
                    </div>)
                }
            </SortableContext>

 
 
    );
};

export default DragImgBox;
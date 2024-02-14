import React from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
const DragImg = ({ id, task }) => {
   const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
   const style={
    transition,
    transform : CSS.Transform.toString(transform)
   }
    return (
        <div ref={setNodeRef} {...attributes} {...listeners } style={style}  >
            {task}
        </div>
    );
};

export default DragImg;
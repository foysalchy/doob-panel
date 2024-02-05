import { useState } from "react";
import { Link } from "react-router-dom";

export default function CategoryList({ menuOpen, setMenuOpen, allCategory, itm }) {
    const [on, setOn] = useState(false);


    const subCategorys = allCategory?.subCategorys.filter((subCategory) => subCategory.megaCategoryId === itm?._id)

    // console.log(subCategorys, '-------');

    const handleData = (data) => {
        console.log(data);
    }

    return (
        <button onClick={() => setMenuOpen(!menuOpen)} className="relative mb-1 text-start py-0 text-md text-black w-full ">
            <div onMouseMove={() => handleData(itm?.name)} className=" w-full">{itm?.name}</div>
        </button>
    );
}
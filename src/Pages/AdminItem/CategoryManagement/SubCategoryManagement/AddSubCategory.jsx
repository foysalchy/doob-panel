import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Swal from "sweetalert2";

const AddSubCategory = () => {

    const { data: subCategory = [], refetch } = useQuery({
        queryKey: ["subCategory"],
        queryFn: async () => {
            const res = await fetch("https://backend.doob.com.bd/api/v1/admin/category/megacategory");
            const data = await res.json();
            return data.rows;
        },
    });
    const [megaCategory, setMegaCategory] = useState({
        id: subCategory[0] && subCategory[0]._id,
        name: subCategory[0] && subCategory[0].name
    });

    console.log();

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const subCategory = form.subCategory.value;

        const data = {
            megaCategoryId: megaCategory.id,
            megaCategoryName: megaCategory.name,
            subCategory: subCategory,
            status: 'true'
        }

        fetch("https://backend.doob.com.bd/api/v1/admin/category/subcategory", {
            method: 'post',
            headers: {
                'content-type': 'application/json',
                // "ngrok-skip-browser-warning": "69420",
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire('Mega category added')
            });
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="lg:max-w-3xl ring-1 ring-gray-200 rounded-xl m-auto w-full md:p-4 p-2">
                <h1 className="text-2xl font-semibold mb-8">Add mega category</h1>
                <label className="" htmlFor="megaCategory">
                    Select  Mega Category
                </label>
                <div className="relative border-2 mt-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 right-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <select
                        required
                        onChange={(e) => setMegaCategory(
                            {
                                id: e.target.value,
                                name: e.target.options[e.target.selectedIndex].text,
                            })}
                        id="megaCategory"
                        name="megaCategory"
                        className="w-full px-3 py-2 text-sm text-gray-600 bg-white rounded-lg shadow-sm outline-none appearance-none"
                    >
                        <option selected disabled> Select your mega category</option>
                        {subCategory?.map((item, idx) => (
                            <option key={idx} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                </div>

                <div className="flex flex-col gap-2 mt-6">
                    <label htmlFor="upload">
                        Enter Sub Category Name
                    </label>
                    <input required type="text" placeholder="enter sub category" name="subCategory" id="upload" className="w-full px-3 py-2 border-2 text-sm text-gray-600 bg-white  shadow-sm outline-none appearance-none  " />
                </div>
                <div className="flex flex-col gap-2">

                    <input value={"Upload"} type="submit" className=" bg-black text-white border-gray-300 w-[100px] mt-6 duration-200 hover:shadow-lg p-2 rounded-lg mb-2" />
                </div>

            </form>
        </div>
    );
};

export default AddSubCategory;
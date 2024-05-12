import { useContext } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import BrightAlert from "bright-alert";

export default function ({ setOpen, itm }) {
  const { shopInfo } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      to: e.target.to.value,
      from: e.target.from.value,
      priceRange: e.target.priceRange.value,
      shopId: shopInfo?.shopId,
    };


    fetch(`https://backend.doob.com.bd/api/v1/seller/edit-price-role?priceId=${itm?._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        BrightAlert("Price role updated!!");
        setOpen(false);
      });
  };
  return (
    <div className="bg-[#00000038] flex items-center p-3 w-screen h-screen top-0 left-0 z-[2000] fixed">
      <div className="bg-white p-4 w-[500px] m-auto rounded-lg">
        <div className="flex items-center pb-2 justify-between">
          <h1 className="text-lg font-semibold">Edit Price Role</h1>
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-100 w-[30px] h-[30px] float-right rounded-full text-xl"
          >
            x
          </button>
        </div>
        <hr />
        <form className=" w-full mt-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priceRole"
              >
                To
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="priceRole"
                type="text"
                name="to"
                placeholder="Enter To value"
                defaultValue={itm.to} // Set input value from itm.to
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priceRole"
              >
                From
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="priceRole"
                type="text"
                name="from"
                placeholder="Enter From value"
                defaultValue={itm.from} // Set input value from itm.from
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="priceRole"
            >
              Price Range
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="priceRole"
              type="text"
              name="priceRange"
              placeholder="Enter price range"
              defaultValue={itm.priceRange} // Set input value from itm.priceRange
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

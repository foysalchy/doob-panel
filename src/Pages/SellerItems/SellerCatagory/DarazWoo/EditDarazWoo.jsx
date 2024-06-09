import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../AuthProvider/UserProvider";
import { useQuery } from "@tanstack/react-query";

export default function EditDarazWoo({ selectedData }) {
  console.log(
    "🚀 ~ file: EditDarazWoo.jsx:5 ~ EditDarazWoo ~ selectedData:",
    selectedData
  );
  // const [selectedData, setSelectedData] = useState([]);
  const [wooData, setWooData] = useState([]);
  const [daraz, setDaraz] = useState(false);
  const { shopInfo } = useContext(AuthContext);

  const { data: darazData = [], refetch } = useQuery({
    queryKey: ["DarazCategoryData"],
    queryFn: async () => {
      const res = await fetch(
        `https://doob.dev/api/v1/category/seller/${shopInfo._id}`
      );
      const data = await res.json();
      return data;
    },
  });

  // console.log(darazData);

  const defaultData = JSON?.parse(selectedData?.darazSubCategory);
  console.log(defaultData, "defaultData");
  const firstDarazData = JSON.parse(
    darazData[0]?.darazCategory ?? ""
  )?.children;
  console.log(firstDarazData);
  const darazOption = darazData?.filter((warehouse) => {
    // console.log(JSON.parse(warehouse.darazCategory).children);
  });

  const wooOption = wooData?.map((warehouse) => ({
    value: warehouse,
    label: warehouse.name,
  }));
  return (
    <div>
      {shopInfo.darazLogin && darazOption?.length > 0 && (
        <div className=" mt-4">
          <div className="mt-4">
            <label className="text-sm">Select Daraz Category</label>
            <Select
              menuPortalTarget={document.body}
              styles={{
                control: (provided) => ({
                  ...provided,
                  cursor: "pointer",
                }),
                option: (provided) => ({
                  ...provided,
                  cursor: "pointer",
                }),
              }}
              name="darazSubCategory"
              required
              options={darazOption}
              placeholder="Select Daraz Category"
            />
          </div>
        </div>
      )}
    </div>
  );
}

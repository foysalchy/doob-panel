import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState, useEffect } from "react";
import Select from "react-select";
import { AuthContext } from "../../../../AuthProvider/UserProvider";

const SelectPathaoAddress = ({ accessToken }) => {
      const { shopInfo } = useContext(AuthContext);
      const [selectedCity, setSelectedCity] = useState(null);
      const [selectedZone, setSelectedZone] = useState(null);
      const [selectedArea, setSelectedArea] = useState(null);
      //   const [selectedExtracategory, setSelectedExtracategory] = useState(null);

      //   console.log(accessToken);
      // Load mega categories
      const {
            data: cityData = [],
            refetch: refetchCity,
            isLoading: loadingCity,
      } = useQuery({
            queryKey: ["cityData"],
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/address-city?access_token=${accessToken}`
                  );
                  const responseData = await res.json();
                  // setDarazOption(responseData?.daraz);
                  console.log(responseData);
                  return responseData;
            },
      });

      //   console.log(cityData, "cityData");

      //   console.log(selectedCity);

      // Load subcategories based on selected mega category
      const {
            data: addressZon = [],
            refetch: refetchAddressZon,
            isLoading: loadingZone,
      } = useQuery({
            queryKey: ["addressZon", selectedCity],
            enabled: !!selectedCity,
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/address-zone?access_token=${accessToken}&city_id=${selectedCity}`
                  );
                  const responseData = await res.json();
                  // setDarazOption(responseData?.daraz);
                  console.log(responseData);
                  return responseData.data;
            },
      });

      // Load mini categories based on selected subcategory
      const {
            data: adressArea = [],
            refetch: refetchArea,
            isLoading: loadingArea,
      } = useQuery({
            queryKey: ["AreaAdresss", selectedZone],
            enabled: !!selectedZone,
            queryFn: async () => {
                  const res = await fetch(
                        `https://doob.dev/api/v1/admin/address-area?access_token=${accessToken}&zone_id=${selectedZone}`
                  );
                  const responseData = await res.json();
                  // setDarazOption(responseData?.daraz);
                  console.log(responseData);
                  return responseData;
            },
      });
      // Handlers for category changes
      const handleCityChange = (city) => {
            setSelectedCity(city);
            setSelectedZone(null);
            setSelectedArea(null);
            // setSelectedExtracategory(null);
      };

      const handleZOneChange = (zone) => {
            setSelectedZone(zone);
            setSelectedArea(null);
            // setSelectedExtracategory(null);
      };

      const handleAreaChange = (area) => {
            setSelectedArea(area);
            // setSelectedExtracategory(null);
      };



      return (
            <div>
                  <div className="border mt-4 border-gray-400 px-10 py-5 w-full bg-gray-100 rounded">
                        <div className="flex flex-col mt-3">
                              <span>
                                    Address Information <span className="text-red-500"> *</span>
                              </span>
                              <div className="grid md:grid-cols-4 mt-3 items-center gap-4">
                                    <Select
                                          name="recipient_city"
                                          onChange={(e) => handleCityChange(e.value)}
                                          placeholder="Select City"
                                          options={
                                                cityData?.data?.length &&
                                                cityData?.data?.map((megaCategory) => ({
                                                      label: megaCategory.city_name,
                                                      value: megaCategory.city_id,
                                                }))
                                          }
                                          className=""
                                    />
                                    {selectedCity && (
                                          <Select
                                                name="recipient_zone"
                                                onChange={(e) => handleZOneChange(e.value)}
                                                placeholder="Select Zone"
                                                options={
                                                      addressZon?.data?.length &&
                                                      addressZon?.data?.map((zoneITem) => ({
                                                            value: zoneITem.zone_id,
                                                            label: zoneITem.zone_name,
                                                      }))
                                                }
                                          />
                                    )}
                                    {selectedZone && (
                                          <Select
                                                name="recipient_area"
                                                placeholder="Select Area"
                                                onChange={(e) => handleAreaChange(e.value)}
                                                options={
                                                      adressArea?.data?.length &&
                                                      adressArea?.data?.map((areaItem) => ({
                                                            value: areaItem?.area_id,
                                                            label: areaItem.area_name,
                                                      }))
                                                }
                                          />
                                    )}
                                    {/* {selectedMinicategory && (
              <Select
                name="extraCategory"
                placeholder="Select ExtraCategory"
                onChange={(e) => handleExtracategoryChange(e.value)}
                options={extraCategories?.map((extraCategory) => ({
                  value: extraCategory.extraCategoryName,
                  label: extraCategory.extraCategoryName,
                }))}
              />
            )} */}
                              </div>

                              {/* <div className="mt-4">
            <strong>Selected Categories:</strong>
            <span className="ml-4">
              {selectedCity && selectedCity}
              {selectedZone && ` > ${selectedZone}`}
              {selectedArea && ` > ${selectedArea} `}

            </span>
          </div> */}
                        </div>
                  </div>
            </div>
      );
};

export default SelectPathaoAddress;

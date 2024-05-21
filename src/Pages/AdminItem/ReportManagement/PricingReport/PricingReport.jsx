import { useQuery } from "@tanstack/react-query";
import EditPrice from "../../PriceMangement/EditPrice";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";

const PricingReport = () => {
  //   const { shopInfo } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { data: priceReportData = [], refetch } = useQuery({
    queryKey: ["priceReportData"],
    queryFn: async () => {
      const res = await fetch(
        "https://backend.doob.com.bd/api/v1/admin/pricing-report"
      );
      const data = await res.json();
      return data;
    },
  });

  const DeletePrice = (id) => {
    fetch(`https://backend.doob.com.bd/api/v1/admin/pricing-report/${id}`, {
      method: "Delete",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Swal.fire("success", "Your Price Delete Successfully", "success");
        refetch();
      });
  };

  const [OpenModal, setOpenModal] = useState(false);

  const handleViewDetails = (ticketId) => {
    setOpenModal(ticketId);
  };

  return (
    <div>
      <>
        <div className="mt-4 lg:pr-10 ">
          <table className="w-full overflow-x-scroll text-left whitespace-no-wrap">
            <thead>
              <tr className="bg-gray-800 rounded-t">
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm  rounded-tl rounded-bl">
                  Plan
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Price
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Time Duration
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {priceReportData.length &&
                priceReportData?.map((price) => (
                  <tr key={price?.name}>
                    <td className="px-4 py-3">{price?.name}</td>
                    <td className="px-4 py-3">{price?.price}</td>
                    <td className="px-4 py-3">{price?.timeDuration}</td>
                    <td className="px-4 py-3 text-xl flex gap-2 items-center text-gray-900">
                      <MdDelete
                        onClick={() => DeletePrice(price?._id)}
                        className="text-red-500 cursor-pointer"
                      />
                    </td>

                    {OpenModal === price?._id && (
                      <div className="h-0 w-0">
                        <EditPrice
                          OpenModal={OpenModal}
                          refetch={refetch}
                          setOpenModal={setOpenModal}
                          FAQInfo={price}
                        />
                      </div>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    </div>
  );
};

export default PricingReport;

import { useQuery } from "@tanstack/react-query";
import EditPrice from "../../PriceMangement/EditPrice";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import Swal from "sweetalert2";
import LoaderData from "../../../../Common/LoaderData";
import showAlert from "../../../../Common/alert";
import { Table, Td, Th, Thead, Tr } from "react-super-responsive-table";

const PricingReport = () => {
      //   const { shopInfo } = useContext(AuthContext);
      const { data: priceReportData = [], refetch, isLoading } = useQuery({
            queryKey: ["priceReportData"],
            queryFn: async () => {
                  const res = await fetch(
                        "https://doob.dev/api/v1/admin/pricing-report"
                  );
                  const data = await res.json();
                  return data;
            },
      });

      const DeletePrice = (id) => {
            fetch(`https://doob.dev/api/v1/admin/pricing-report/${id}`, {
                  method: "Delete",
                  headers: {
                        "content-type": "application/json",
                  },
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log(data);
                        showAlert("success", "Your Price Delete Successfully", "success");
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
                              <Table className="w-full border border-gray-400 bar overflow-x-scroll text-left whitespace-no-wrap">
                                    <Thead>
                                          <Tr className="bg-gray-800 rounded-t">
                                                <Th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm  rounded-tl rounded-bl">
                                                      Plan
                                                </Th>
                                                <Th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                                                      Price
                                                </Th>
                                                <Th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                                                      Yearly Price
                                                </Th>
                                                <Th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                                                      Time Duration
                                                </Th>
                                                <Th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                                                      Product Limit
                                                </Th>
                                                <Th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                                                      Permission Number
                                                </Th>
                                                <Th className="px-4 py-3 title-font tracking-wider font-medium text-gray-100 text-sm ">
                                                      Action
                                                </Th>
                                          </Tr>
                                    </Thead>
                                    <tbody>
                                          {isLoading ? (
                                                <Tr>
                                                      <Td colSpan="7" className="text-center py-8">
                                                            <LoaderData />
                                                      </Td>
                                                </Tr>
                                          ) :
                                                priceReportData.length ?
                                                      priceReportData?.map((price) => (
                                                            <Tr key={price?.name}>
                                                                  <Td className="px-4 py-3">{price?.name}</Td>
                                                                  <Td className="px-4 py-3">{price?.price}</Td>
                                                                  <Td className="px-4 py-3">{price?.twelve}</Td>
                                                                  <Td className="px-4 py-3">{price?.timeDuration}</Td>
                                                                  <Td className="px-4 py-3">{price?.product_limit}</Td>
                                                                  <Td className="px-4 py-3">{price?.permissions?.length}</Td>
                                                                  <Td className="px-4 py-3 text-3xl flex gap-2 items-center text-gray-900">
                                                                        <MdDelete
                                                                              onClick={() => DeletePrice(price?._id)}
                                                                              className="text-red-500 cursor-pointer "
                                                                        />
                                                                  </Td>

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
                                                            </Tr>
                                                      ))
                                                      :
                                                      <Tr>
                                                            <Td colSpan="7">No Data Found</Td>
                                                      </Tr>

                                          }
                                    </tbody>
                              </Table>
                        </div>
                  </>
            </div>
      );
};

export default PricingReport;

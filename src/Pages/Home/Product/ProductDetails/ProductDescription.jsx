import React, { useState } from "react";
import { MdDone } from "react-icons/md";
import { PiCopy } from "react-icons/pi";

const ProductDescription = ({ metaTitle, description, shortDescription, productFind }) => {
      const [disOn, setDisOn] = useState(false)
      const [copyStatus, setCopyStatus] = useState(false);
      const handleCopyDescription = () => {
            if (description) {
                  navigator.clipboard
                        .writeText(description)
                        .then(() => {
                              setCopyStatus(true);
                              setTimeout(() => {
                                    setCopyStatus(false);
                              }, 3000);
                        })
                        .catch((err) => {
                              console.error("Failed to copy description: ", err);
                        });
            }
      };


      return (

            <div
                  onClick={() => setDisOn(!disOn)}
                  className={`${disOn ? "h-full" : "h-[350px] overlap"} bar overflow-hidden`}
            >
                  <style jsx>{`

      .overlap{
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.2) 60%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0.4) 100%);
     position: relative;
      }
     .overlap:after{
     width: 50px;
height: 50px;
background: black;
content: '\\2193\\2193';
position: absolute;
bottom: 10px;
right: 0;
left: 0;
margin: auto;
text-align:center;
line-height:50px;
border-radius:50%;
color:white;
 cursor: pointer;
      }
     `}</style>
                  <h2 className="border-b flex justify-between">
                        <span className="font-medium text-xl text-blue-500 border-b-2 border-blue-500">
                              Description
                        </span>
                        <button
                              className="bg-gray-100 px-2 py-1 rounded"
                              onClick={handleCopyDescription}
                        >
                              {!copyStatus ? (
                                    <PiCopy className="text-xl" />
                              ) : (
                                    <span className="text-xs font-semibold">Coped</span>
                              )}
                        </button>
                  </h2>
                  <div className="specification">
                        {productFind?.darazOptionData?.map((productx, index) => (
                              <div key={index}>
                                    {Object.entries(productx).map(([key, value], idx) => (
                                          key !== 'short_description' && key !== 'promotion_whitebkg_image' && ( // Skip 'short_description'
                                                <p key={idx}>
                                                      <strong>{key}</strong>: {value}
                                                </p>
                                          )
                                    ))}
                              </div>
                        ))}
                  </div>
                  <div
                        className="mb-2 text_editor  text-start  "
                        dangerouslySetInnerHTML={{
                              __html: shortDescription,
                        }}
                  />
                  <div
                        className="mt-4  text_editor"
                        dangerouslySetInnerHTML={{
                              __html: description,
                        }}
                  />
                  {/* <p className="text-gray-500">
        {metaTitle}
      </p> */}
            </div>
      );
};

export default ProductDescription;

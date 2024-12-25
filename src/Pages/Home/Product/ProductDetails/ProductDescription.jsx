import React, { useEffect,useState,useRef } from "react";
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
      const containerRef = useRef(null);


      const [innerHeight, setInnerHeight] = useState(false);
            useEffect(() => {
      setDisOn(false)

              // Function to check height
              const checkHeight = () => {
                if (containerRef.current) {
                  const height = containerRef.current.clientHeight;
                  if (height > 400) {
                        console.log(1,'heightheight')
                    setInnerHeight(true)
                  } else {
                        console.log(2,'heightheight')
                    setInnerHeight(false)
                  }
                  console.log(innerHeight,height,'heightheight')
                }
              };
        
              // Check height on mount and resize
              checkHeight();
              window.addEventListener('resize', checkHeight);
          
              // Cleanup on unmount
              return () => {
                window.removeEventListener('resize', checkHeight);
              };
            }, [productFind,description]);


      

      return (
            <div>
            {innerHeight == true ? (
            <div   ref={containerRef}> 
            <div
                  onClick={() => setDisOn(!disOn)}
                  className={`${disOn ? "h-full" : "h-[400px] overlap"} bar overflow-hidden`}
            >
                 
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
                  {Array.isArray(productFind?.darazOptionData) && productFind.darazOptionData.map((productx, index) => (
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

                  <style jsx>{`

                        .overlap{
                        background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.2) 60%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0.4) 100%);
                        position: relative;
                        }
                        .overlap:after {
                        width: 100px;
                        height: 52px;
                        box-shadow: 0px 0px 34px white;
                        background: black;
                        content: 'Load More';
                        position: absolute;
                        bottom: 10px;
                        right: 0;
                        left: 0;
                        margin: auto;
                        text-align: center;
                        line-height: 50px;
                        border-radius: 5PX;
                        color: white;
                        cursor: pointer;
                        }
                        `}</style>
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
              
            </div>
            </div>
            ) : (
            


                  <div   ref={containerRef}> 
                  <div
                      
                        className={`h-full bar overflow-hidden`}
                  >
                       
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
                        {Array.isArray(productFind?.darazOptionData) && productFind.darazOptionData.map((productx, index) => (
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
      
                        <style jsx>{`
      
                              .overlap{
                              background: linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 20%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 0.2) 60%, rgba(0, 0, 0, 0.2) 80%, rgba(0, 0, 0, 0.4) 100%);
                              position: relative;
                              }
                              .overlap:after {
                              width: 100px;
                              height: 52px;
                              box-shadow: 0px 0px 34px white;
                              background: black;
                              content: 'Load More';
                              position: absolute;
                              bottom: 10px;
                              right: 0;
                              left: 0;
                              margin: auto;
                              text-align: center;
                              line-height: 50px;
                              border-radius: 5PX;
                              color: white;
                              cursor: pointer;
                              }
                              `}</style>
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
                    
                  </div>
                  </div>
            )}
            </div>
      );
};

export default ProductDescription;

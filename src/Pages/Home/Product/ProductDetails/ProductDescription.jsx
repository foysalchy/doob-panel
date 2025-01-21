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
            //     if (containerRef.current) {
            //       const height = containerRef.current.clientHeight;
            //       if (height > 700) {
            //             console.log(1,'heightheight')
            //         setInnerHeight(true)
            //       } else {
            //             console.log(2,'heightheight')
            //         setInnerHeight(false)
            //       }
            //       console.log(innerHeight,height,'heightheight')
            //     }
            setInnerHeight(true)
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
                  className={`${disOn ? "h-full" : "h-[400px] "} overflow-hidden`}
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
       position: relative;
       
      }
.overlap:after {
  width: 160px;
  height: 52px;
  background: #00000017;
  content: 'Load More';
  position: absolute;
  bottom: 10px;
  right: 0;
  left: 0;
  margin: auto;
  text-align: center;
  line-height: 50px;
  border-radius: 5PX;
  color: black;
  cursor: pointer;
  box-shadow: 0px 0px 34px white;
  font-weight: 700;
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
            <div  onClick={() => setDisOn(!disOn)}  className={`${disOn ? "" : "h-[80px] overlap"} overflow-hidden`}></div>
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

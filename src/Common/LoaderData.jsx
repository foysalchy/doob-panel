import React from "react";

export default function LoaderData() {
  return (
    <div className="load">
      <style jsx>{`
       .load{
       text-align: center;
border: 1px solid;
border-radius: 5px;
       }
      `}</style>
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>


  );
}

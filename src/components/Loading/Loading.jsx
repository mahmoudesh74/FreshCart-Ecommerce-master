import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="  bg-gray-100 container d-flex justify-content-center py-5 my-5">
      <Oval
        visible={true}
        height={100}
        width={100}
        color="#4fa94d"
        secondaryColor=""
        strokeWidth={5}
        ariaLabel="oval-loading"
      />
    </div>
  );
}


// import React from "react";
// import { Rings } from "react-loader-spinner";
// export default function Loading() {
//   return (
//     <div className="container d-flex justify-content-center py-5 my-5 ">
//       <Rings
//         visible={true}
//         height="80"
//         width="80"
//         color="#4fa94d"
//         ariaLabel="rings-loading"
//         wrapperStyle={{}}
//         wrapperClass=""
//       />
//     </div>
//   );
// }

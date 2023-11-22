// // SearchComponent.js
// import React, { useState } from "react";

// const SearchComponent = ({ onSearch }) => {
//   const [registrationNumber, setRegistrationNumber] = useState("");
//   console.log("inside search component", onSearch);
//   const handleSearch = () => {
//     // Call the provided callback function to perform the search
//     console.log("handle search", registrationNumber);
//     onSearch(registrationNumber);
//     console.log("after handle search", registrationNumber);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter Registration Number"
//         value={registrationNumber}
//         onChange={(e) => setRegistrationNumber(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>
//     </div>
//   );
// };

// export default SearchComponent;

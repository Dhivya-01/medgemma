// import axios from "axios";



// export const ax = axios.create({ 
//   baseURL: `${import.meta.env.VITE_API_LINK}/service/api/v1`
// });


import axios from "axios";

// Create two separate axios instances for each API
export const axChecker = axios.create({ 
  baseURL: `${import.meta.env.VITE_API_LINK_CHECKER}/service/api/v1`
});

export const axMaker = axios.create({ 
  baseURL: `${import.meta.env.VITE_API_LINK_MAKER}/service/api/v1`
});
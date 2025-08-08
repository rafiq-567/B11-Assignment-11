// // src/hooks/useAxiosSecure.js
// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router"; 

// const axiosSecure = axios.create({
//   baseURL: "http://localhost:3000",
//   withCredentials: true,
// });

// const useAxiosSecure = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interceptor = axiosSecure.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (error.response?.status === 401 || error.response?.status === 403) {
//           navigate("/login");
//         }
//         return Promise.reject(error);
//       }
//     );

//     return () => axiosSecure.interceptors.response.eject(interceptor);
//   }, [navigate]);

//   return axiosSecure;
// };

// export default useAxiosSecure;

// src/hooks/useAxiosSecure.js
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

// ✅ Add request logging interceptor
axiosSecure.interceptors.request.use((config) => {
  console.log(`[Axios] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  return config;
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => axiosSecure.interceptors.response.eject(interceptor);
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;


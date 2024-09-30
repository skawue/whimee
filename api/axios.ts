import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 2000,
});

axios.interceptors.request.use(
  (request) => {
    console.log("Request", JSON.stringify(request, null, 2));

    return request;
  },
  (error) => {
    console.error("Request error:", JSON.stringify(error, null, 2));
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("Response:", JSON.stringify(response, null, 2));

    return response;
  },
  (error) => {
    console.error("Response error:", JSON.stringify(error, null, 2));
  }
);

export { axios };

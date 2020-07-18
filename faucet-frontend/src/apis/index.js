import { baseUrl } from "../constants";
import { toast } from "react-toastify";

const apiRequest = async ({ url, method, data }) => {
  if (!navigator.onLine) {
    toast.error("Failed. Please check internet connection");
    return;
  }

  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const response = await fetch(`${baseUrl}${url}`, {
    method,
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (result.error) {
    throw result.error;
  }
  return result;
};

export const post = (url, data) => {
  return apiRequest({ url, method: "POST", data });
};

export const get = (url) => {
  return apiRequest({ url, method: "GET" });
};

export const put = (url, data) => {
  return apiRequest({ url, method: "PUT", data });
};

export const patch = (url, data) => {
  return apiRequest({ url, method: "PATCH", data });
};

export const remove = (url, data) => {
  return apiRequest({ url, method: "DELETE", data });
};

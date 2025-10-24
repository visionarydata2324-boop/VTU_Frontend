// src/config.js
const BASE_URLS = {
  default: "https://vtu-backend-uqmx.onrender.com",
  alternate: "https://backup-api.onrender.com", // second base url
};


let currentBaseUrl = localStorage.getItem("baseUrl") || BASE_URLS.default;

export const getBaseUrl = () => currentBaseUrl;

// console.log(getBaseUrl());

export const setBaseUrl = (key) => {
  if (BASE_URLS[key]) {
    currentBaseUrl = BASE_URLS[key];
    localStorage.setItem("baseUrl", currentBaseUrl);
    console.log(`✅ Base URL switched to: ${currentBaseUrl}`);
  } else {
    console.warn("⚠️ Invalid base URL key");
  }
};

export default BASE_URLS;

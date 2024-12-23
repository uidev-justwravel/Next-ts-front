import axios from "axios";

const environment: string = process.env.NEXT_PUBLIC_ENVIRONMENT || "development";

interface ServiceData {
  serviceURL: string;
  clientURL: string;
}

const serviceData: ServiceData = {
  serviceURL: "",
  clientURL: ""
};

switch (environment) {
  case "development":
    serviceData.serviceURL = process.env.NEXT_PUBLIC_LOCAL_SERVER_URL || "https://dummyjson.com";
    serviceData.clientURL = process.env.NEXT_PUBLIC_LOCAL_CLIENT_URL || "http://localhost:3000";
    break;
  case "staging":
    serviceData.serviceURL = process.env.NEXT_PUBLIC_STAGING_SERVER_URL || "http://localhost:5000";
    serviceData.clientURL = process.env.NEXT_PUBLIC_STAGING_CLIENT_URL || "http://localhost:3000";
    break;
  case "production":
    serviceData.serviceURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
    serviceData.clientURL = process.env.NEXT_PUBLIC_CLIENT_URL || "http://localhost:3000";
    break;
  default:
    console.error("Unknown environment:", environment);
    serviceData.serviceURL = "http://localhost:5000";
    serviceData.clientURL = "http://localhost:3000";
    break;
}


export const axiosClient = axios.create({
  baseURL: serviceData.serviceURL,
});

export const axiosClientLeads = axios.create({
  baseURL: `http://192.168.0.168:3000`,
});



export default serviceData;

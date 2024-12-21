import { axiosClient } from "@/config";

export const getAllUsers = () => {
    return axiosClient.get(`/users`);
};
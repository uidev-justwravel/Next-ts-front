import { axiosClient } from "@/config";

export const getAllUsers = () => {
    return axiosClient.get(`/users`);
};

export const createUser = (data: BasicUser) => {
    return axiosClient.post(`/users/add`, data);
};
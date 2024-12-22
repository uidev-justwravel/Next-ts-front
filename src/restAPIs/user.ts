import { axiosClient } from "@/config";

export const getAllUsers = () => {
    return axiosClient.get(`/users`);
};

export const createUser = (data: User) => {
    return axiosClient.post(`/users/add`, data);
};
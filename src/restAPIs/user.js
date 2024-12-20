import { axiosClient } from '@/config'

export const getAllUsers = () => {
    return axiosClient.get(`/users`)
}

export const getUserByID = (id) => {
    return axiosClient.get(`/users/${id}`)
}

export const addUser = (data) => {
    return axiosClient.post(`/users`, data)
}

export const updateUser = (id, data) => {
    return axiosClient.put(`/users/${id}`, data)
}

export const deleteUser = (id) => {
    return axiosClient.delete(`/users/${id}`)
}

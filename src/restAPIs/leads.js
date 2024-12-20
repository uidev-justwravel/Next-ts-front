import { axiosClient } from '@/config'

export const getAllLeads = () => {
    return axiosClient.get(`/leads`)
}

export const getLeadByID = (id) => {
    return axiosClient.get(`/leads/${id}`)
}

export const addLead = (data) => {
    return axiosClient.post(`/leads`, data)
}

export const updateLead = (id, data) => {
    return axiosClient.put(`/leads/${id}`, data)
}

export const deleteLead = (id) => {
    return axiosClient.delete(`/leads/${id}`)
}

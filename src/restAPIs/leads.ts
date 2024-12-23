import { axiosClientLeads } from "@/config";

export const getAllLeads = () => {
    return axiosClientLeads.get(`/leads`);
};

export const createLeads = (data: FormLead) => {
    return axiosClientLeads.post(`/leads`, data);
};

export const getLeadByID = (id: string) => {
    return axiosClientLeads.get(`/leads/${id}`);
};

export const updateLead = (data: FormLead, id: string) => {
    return axiosClientLeads.put(`/leads/${id}`, data);
};

export const deleteLead = (id: string) => {
    return axiosClientLeads.delete(`/leads/${id}`);
};
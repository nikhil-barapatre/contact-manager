import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const fetchContacts = async ({ page = 1, limit = 10 }) => {
  const params = {
    _page: page,
    _limit: limit,
  };
  const response = await api.get(`/contacts`, { params });
  const totalCount = parseInt(response.headers["x-total-count"], 10);
  return { data: response.data, totalCount };
};

export const addContact = async (contact) => {
  const { data } = await api.post("/contacts", contact);
  return data;
};

export const updateContact = async ({ id, ...contact }) => {
  const { data } = await api.put(`/contacts/${id}`, contact);
  return data;
};

export const deleteContact = async (id) => {
  const { data } = await api.delete(`/contacts/${id}`);
  return data;
};

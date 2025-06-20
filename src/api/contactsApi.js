import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001',
});

export const fetchContacts = async({ page = 1, limit = 10, search = '', showFavouritesOnly = false }) => {
    const params = {
        _page: page,
        _limit: limit,
        _sort: 'id',
        _order: 'desc',
    };
    if (search) params.name_like = search;
    if (showFavouritesOnly) params.favourite = true;
    const response = await api.get(`/contacts`, { params });
    const total = parseInt(response.headers['x-total-count'], 10) || response.data.length;
    return { data: response.data, total };
};

export const addContact = async(contact) => {
    const { data } = await api.post('/contacts', contact);
    return data;
};

export const updateContact = async({ id, ...contact }) => {
    const { data } = await api.put(`/contacts/${id}`, contact);
    return data;
};

export const deleteContact = async(id) => {
    const { data } = await api.delete(`/contacts/${id}`);
    return data;
};
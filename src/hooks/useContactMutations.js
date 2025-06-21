import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addContact, updateContact, deleteContact } from '../api/contactsApi';
import { CONTACTS_QUERY_KEY } from './useContactsQuery';
import useUIStore from '../store/uiStore';

const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    return error.message;
}

export const useAddContact = () => {
    const queryClient = useQueryClient();
    const setError = useUIStore((state) => state.setError);
    const setSuccess = useUIStore((state) => state.setSuccess);
    return useMutation({
        mutationFn: addContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
            setSuccess('Contact added successfully!');
        },
        onError: (error) => {
            setError(getErrorMessage(error));
        },
    });
};

export const useUpdateContact = () => {
    const queryClient = useQueryClient();
    const setError = useUIStore((state) => state.setError);
    const setSuccess = useUIStore((state) => state.setSuccess);
    return useMutation({
        mutationFn: updateContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
            setSuccess('Contact updated successfully!');
        },
        onError: (error) => {
            setError(getErrorMessage(error));
        },
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();
    const setError = useUIStore((state) => state.setError);
    const setSuccess = useUIStore((state) => state.setSuccess);
    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
            setSuccess('Contact deleted successfully!');
        },
        onError: (error) => {
            setError(getErrorMessage(error));
        },
    });
};
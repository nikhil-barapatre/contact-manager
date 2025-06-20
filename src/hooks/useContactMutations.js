import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addContact, updateContact, deleteContact } from '../api/contactsApi';
import { CONTACTS_QUERY_KEY } from './useContactsQuery';

export const useAddContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
        },
    });
};

export const useUpdateContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
        },
    });
};

export const useDeleteContact = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_QUERY_KEY] });
        },
    });
};
import { useQuery } from '@tanstack/react-query';
import { fetchContacts } from '../api/contactsApi';

export const CONTACTS_QUERY_KEY = 'contacts';

const useContactsQuery = () => {
    return useQuery({
        queryKey: [CONTACTS_QUERY_KEY],
        queryFn: () => fetchContacts({ page: 1, limit: 1000 }),
    });
};

export default useContactsQuery;
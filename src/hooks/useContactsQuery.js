import { useQuery } from '@tanstack/react-query';
import { fetchContacts } from '../api/contactsApi';
import useContactStore from '../store/contactStore';

export const CONTACTS_QUERY_KEY = 'contacts';

const useContactsQuery = ({ page = 0, limit = 10 } = {}) => {
    const { search } = useContactStore();
    const pageNum = page + 1; // json-server is 1-based

    return useQuery({
        queryKey: [
            CONTACTS_QUERY_KEY,
            { page: pageNum, limit, search },
        ],
        queryFn: () => fetchContacts({ page: pageNum, limit, search }),
        keepPreviousData: true,
    });
};

export default useContactsQuery;
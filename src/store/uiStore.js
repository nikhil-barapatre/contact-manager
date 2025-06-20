import { create } from 'zustand';

const useUIStore = create((set) => ({
    isModalOpen: false,
    setModalOpen: (open) => set({ isModalOpen: open }),
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
}));

export default useUIStore;
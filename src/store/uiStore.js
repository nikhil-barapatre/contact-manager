import { create } from "zustand";

const useUIStore = create((set) => ({
    isModalOpen: false,
    setModalOpen: (open) => set({ isModalOpen: open }),
    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),
    error: null,
    setError: (error) => set({ error }),
    success: null,
    setSuccess: (success) => set({ success }),
}));

export default useUIStore;
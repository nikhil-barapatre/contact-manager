import { create } from "zustand";

const useContactStore = create((set) => ({
  search: "",
  setSearch: (search) => set({ search }),
  selectedContactId: null,
  setSelectedContactId: (id) => set({ selectedContactId: id }),
  selectedContact: null,
  setSelectedContact: (contact) => set({ selectedContact: contact }),
  showFavouritesOnly: false,
  setShowFavouritesOnly: (show) => set({ showFavouritesOnly: show }),
}));

export default useContactStore;

import useContactStore from "../store/contactStore";

export const useSearch = () => useContactStore((state) => state.search);
export const useSetSearch = () => useContactStore((state) => state.setSearch);
export const useSelectedContactId = () =>
  useContactStore((state) => state.selectedContactId);
export const useSetSelectedContactId = () =>
  useContactStore((state) => state.setSelectedContactId);
export const useShowFavouritesOnly = () =>
  useContactStore((state) => state.showFavouritesOnly);
export const useSetShowFavouritesOnly = () =>
  useContactStore((state) => state.setShowFavouritesOnly);

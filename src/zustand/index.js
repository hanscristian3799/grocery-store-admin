import { create } from 'zustand'

export const useStore = create(set => ({
  lastId: 0,
  setLastId: (id) => set(() => ({ lastId: id })),
}))
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;      // typically size identifier e.g., '3kg', '6kg', 'item-id'
  name: string;
  price: number;
  qty: number;
  image?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (newItem) => set((state) => {
        const existing = state.items.find(i => i.id === newItem.id);
        if (existing) {
          return { items: state.items.map(i => i.id === newItem.id ? { ...i, qty: i.qty + newItem.qty } : i) };
        }
        return { items: [...state.items, newItem] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      updateQty: (id, qty) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, qty } : i)
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'blueflame-cart-storage',
    }
  )
);

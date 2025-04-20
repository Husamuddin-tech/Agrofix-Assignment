// store/orderStore.ts
import { create } from "zustand";

type OrderItem = {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
  };
  quantity: number;
};

interface OrderState {
  orderItems: OrderItem[];
  addToOrder: (item: {
    productId: string;
    name: string;
    price: number;
    quantity?: number;
  }) => void;
  removeFromOrder: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  orderItems: [],

  addToOrder: ({ productId, name, price, quantity = 1 }) => {
    const existingItem = get().orderItems.find(
      (item) => item.product.id === productId
    );

    if (existingItem) {
      set({
        orderItems: get().orderItems.map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        ),
      });
    } else {
      set((state) => ({
        orderItems: [
          ...state.orderItems,
          {
            product: { id: productId, name, price, stock: 1000 }, // placeholder stock
            quantity,
          },
        ],
      }));
    }
  },

  removeFromOrder: (productId) => {
    set((state) => ({
      orderItems: state.orderItems.filter(
        (item) => item.product.id !== productId
      ),
    }));
  },

  updateQuantity: (productId, newQuantity) => {
    set((state) => ({
      orderItems: state.orderItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ),
    }));
  },

  clearOrder: () => {
    set({ orderItems: [] });
  },
}));

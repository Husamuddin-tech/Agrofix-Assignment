import { create } from "zustand";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  image?: string;
}

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));

export default useProductStore;

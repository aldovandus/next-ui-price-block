/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface PriceBlockStoreState {
  gridSize: number;
  numRows: number;
  numCols: number;
  discount: string;
  isLoading?: boolean;
  fullPriceValue?: string;
  discountedValue?: string;
  textCustom1?: string;
  textCustom2?: string;
  textCustom3?: string;
  setGridSize(_: number): void;
  setNumRows(_: number): void;
  setNumCols(_: number): void;
  setLoading(_: boolean): void;
}

const usePriceBlockStore = create<PriceBlockStoreState>((set) => ({
  gridSize: 18,
  numRows: 20,
  numCols: 20,
  discount: "20%",
  isLoading: false,

  setGridSize: (value: number) => set({ gridSize: value }),
  setNumRows: (value: number) => set({ numRows: value }),
  setNumCols: (value: number) => set({ numCols: value }),
  setLoading: (loading: boolean) => set({ isLoading: loading })
}));

export { usePriceBlockStore };

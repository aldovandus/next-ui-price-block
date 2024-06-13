/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface PriceBlockStoreState {
  gridSize: number;
  numRows: number;
  numCols: number;
  discount: string;
  fullPriceValue?: string;
  discountedValue?: string;
  setGridSize(_: number): void;
  setNumRows(_: number): void;
  setNumCols(_: number): void;
}

const usePriceBlockStore = create<PriceBlockStoreState>((set) => ({
  gridSize: 18,
  numRows: 20,
  numCols: 20,
  discount: "20%",
  setGridSize: (value: number) => set({ gridSize: value }),
  setNumRows: (value: number) => set({ numRows: value }),
  setNumCols: (value: number) => set({ numCols: value })
}));

export { usePriceBlockStore };

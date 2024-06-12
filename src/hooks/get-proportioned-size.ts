import { usePriceBlockStore } from "../zustand/price-block-store";

const getProportionedSize = (size?: string) => {
  const gridSize = usePriceBlockStore.getState().gridSize;
  if (size?.includes("unit")) {
    return parseFloat(size) * (gridSize / 10) + "px";
  }
};

export { getProportionedSize };

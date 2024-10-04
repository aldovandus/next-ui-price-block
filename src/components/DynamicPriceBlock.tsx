import { useEffect, useMemo } from "react";
import Elements from "./Elements";
import { PriceBLockForSave } from "./types";
import { usePriceBlockStore } from "../zustand/price-block-store";

interface Props {
  elementKey: string;
  priceBlockJson: PriceBLockForSave;
  gridSize: number;
  numRows: number;
  numCols: number;
  fullPriceValue?: string;
  discountedValue?: string;
  discount?: string;
  unitType?: string;
  fontsUrl?: string;
  textCustom?: { id: string; value: string }[];
}

const DynamicPriceBlock = ({
  elementKey,
  priceBlockJson,
  gridSize,
  numRows,
  numCols,
  discount,
  fontsUrl,
  fullPriceValue,
  discountedValue,
  unitType,
  textCustom
}: Props) => {
  const background = priceBlockJson?.settings?.background;

  const getBackground = useMemo(() => {
    if (background.type == "image") {
      return `url(${background.url}) center center / contain no-repeat`;
    } else if (background.type == "color") {
      return background.color;
    } else {
      return "none";
    }
  }, [background?.color, background?.type, background?.url]);

  useEffect(() => {
    /*     if (gridSize) usePriceBlockStore.setState({ gridSize });
    if (numRows) usePriceBlockStore.setState({ numRows });
    if (numCols) usePriceBlockStore.setState({ numCols });
    usePriceBlockStore.setState({ discount, fullPriceValue, discountedValue, textCustom1, textCustom2, textCustom3 }); */
    usePriceBlockStore.getState().initPriceBlockReader(elementKey, {
      fontsUrl,
      discount,
      fullPriceValue,
      discountedValue,
      unitType,
      textCustom
    });
  }, [discount, discountedValue, elementKey, fontsUrl, fullPriceValue, textCustom, unitType]);

  if (!priceBlockJson) return null;
  return (
    <div
      className="relative"
      style={{
        background: getBackground,
        height: numRows * gridSize,
        width: numCols * gridSize
      }}
    >
      <Elements
        gridSize={gridSize}
        numRows={numRows}
        elementKey={elementKey}
        elements={priceBlockJson.priceBlockElements}
        settings={priceBlockJson.settings}
      />
    </div>
  );
};

export default DynamicPriceBlock;

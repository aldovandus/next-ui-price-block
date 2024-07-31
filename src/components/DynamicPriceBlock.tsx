import { useEffect, useMemo } from 'react';
import Elements from './Elements';
import { PriceBLockForSave } from './types';
import { usePriceBlockStore } from '../zustand/price-block-store';

interface Props {
  elementKey: string;
  priceBlockJson: PriceBLockForSave;
  gridSize?: number;
  numRows?: number;
  numCols?: number;
  fullPriceValue?: string;
  discountedValue?: string;
  discount?: string;
  fontsUrl?: string;
  textCustom1?: string;
  textCustom2?: string;
  textCustom3?: string;
}

const DynamicPriceBlock = ({
  elementKey,
  priceBlockJson,
  gridSize,
  numRows = 8,
  numCols = 8,
  discount,
  fontsUrl,
  fullPriceValue,
  discountedValue,
  textCustom1,
  textCustom2,
  textCustom3,
}: Props) => {
  const gridSizeValue = usePriceBlockStore((state) => state.gridSize);

  const background = priceBlockJson?.settings?.background;

  const getBackground = useMemo(() => {
    if (background.type == 'image') {
      return `url(${background.url}) center center / contain no-repeat`;
    } else if (background.type == 'color') {
      return background.color;
    } else {
      return 'none';
    }
  }, [background?.color, background?.type, background?.url]);

  useEffect(() => {
    /*     if (gridSize) usePriceBlockStore.setState({ gridSize });
    if (numRows) usePriceBlockStore.setState({ numRows });
    if (numCols) usePriceBlockStore.setState({ numCols });
    usePriceBlockStore.setState({ discount, fullPriceValue, discountedValue, textCustom1, textCustom2, textCustom3 }); */
    usePriceBlockStore.getState().initPriceBlockReader(elementKey, {
      gridSize,
      numRows,
      numCols,
      fontsUrl,
      discount,
      fullPriceValue,
      discountedValue,
      textCustom1,
      textCustom2,
      textCustom3,
    });
  }, [discount, discountedValue, elementKey, fontsUrl, fullPriceValue, gridSize, numCols, numRows, textCustom1, textCustom2, textCustom3]);

  if (!priceBlockJson) return null;
  return (
    <div
      className="relative"
      style={{
        background: getBackground,
        height: numRows * gridSizeValue,
        width: numCols * gridSizeValue,
      }}
    >
      <Elements elementKey={elementKey} elements={priceBlockJson.priceBlockElements} settings={priceBlockJson.settings} />
    </div>
  );
};

export default DynamicPriceBlock;

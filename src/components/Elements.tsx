/* eslint-disable @typescript-eslint/no-explicit-any */
//import usePriceBlockStore from '@/zustand/price-block/priceBlock';
import { CSSProperties, FC, useMemo } from 'react';
import {
  IGenericPreviewProps,
  IPriceBlockElement,
  IPriceBlockElements,
  IPriceBlockSettings,
  PriceBlockElementKey,
  PriceBlockGenericProperties,
} from './types';
import FullPricePreview from './preview/FullPricePreview';
import DiscountedPreview from './preview/DiscountedPreview';
import DiscountPreview from './preview/DiscountPreview';
import CustomFieldPreview from './preview/CustomFieldPreview';
import BadgePreview from './preview/BadgePreview';
import { usePriceBlockStore } from '../zustand/price-block-store';
//import DraggableItem from '../DraggableItem';
//import { PriceBlockElementKey } from '../types';
//import { GRID_SIZE, NUM_COLUMNS, NUM_COLUMNS_BADGE, NUM_ROWS } from '../PriceBlockGrid';

/* export const GRID_SIZE = 12;
export const NUM_ROWS = 17;
export const NUM_COLUMNS = 8; */
export const NUM_COLUMNS_BADGE = 24;
export const LIMIT_TOP_ROW_BADGE = -4;

type LookupElement = { [key in PriceBlockElementKey]: FC<IGenericPreviewProps> };
const lookupContent: Partial<LookupElement> = {
  [PriceBlockElementKey.FULLPRICE]: FullPricePreview,
  [PriceBlockElementKey.DISCOUNTED]: DiscountedPreview,
  [PriceBlockElementKey.DISCOUNT]: DiscountPreview,
  /* 	[PriceBlockElementKey.DISCOUNT]: DiscountPreview,
	[PriceBlockElementKey.DISCOUNTED]: DiscountedPreview, */
  [PriceBlockElementKey.BADGE]: BadgePreview,
  [PriceBlockElementKey.CUSTOMFIELD_1]: CustomFieldPreview,
  [PriceBlockElementKey.CUSTOMFIELD_2]: CustomFieldPreview,
  [PriceBlockElementKey.CUSTOMFIELD_3]: CustomFieldPreview,
};

// Props for the Item component
interface ItemProps {
  id?: PriceBlockElementKey;
  item?: IPriceBlockElement<any>;
  settings: IPriceBlockSettings;
  properties?: PriceBlockGenericProperties;
  elementKey: string;
}

const Item = (props: ItemProps) => {
  const gridSize = usePriceBlockStore((state) => state.gridSize);
  //const numCols = usePriceBlockStore((state) => state.numCols);
  const numRows = usePriceBlockStore((state) => state.numRows);
  const { item } = props;
  const currentStyle = useMemo(() => {
    if (!item) return {};
    const { position } = item;
    return {
      position: 'absolute',
      bottom: (numRows - position.rowEnd) * gridSize,
      left: position.colStart * gridSize,
      width: (position.colEnd - position.colStart) * gridSize,
      height: (position.rowEnd - position.rowStart) * gridSize,
      zIndex: item.layer,
    };
  }, [gridSize, item, numRows]);

  const Component = lookupContent[props.id as PriceBlockElementKey] as any;

  return (
    <div style={currentStyle as CSSProperties}>
      <Component {...props} />
    </div>
  );
};

const Elements = ({ elementKey, elements, settings }: { elementKey: string; elements: IPriceBlockElements; settings: IPriceBlockSettings }) => {
  /*   const style = useMemo(() => {
    return {
      height: NUM_ROWS * GRID_SIZE,
      width: NUM_COLUMNS * GRID_SIZE
    };
  }, []); */
  return (
    <div className="h-full w-full  ">
      {Object.keys(elements).map((keyElement) => {
        const element = elements[keyElement as PriceBlockElementKey];

        return (
          <Item
            elementKey={elementKey}
            properties={element?.properties}
            item={element}
            settings={settings}
            key={`${elementKey}_${keyElement}`}
            id={keyElement as PriceBlockElementKey}
          />
        );
      })}
    </div>
  );
};

export default Elements;

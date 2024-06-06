//import usePriceBlockStore from '@/zustand/price-block/priceBlock';
import React, { FC, useMemo } from "react";
import { AlignText, FontStyle, PriceBlockElementKey } from "./types";
import FullPricePreview from "./preview/FullPricePreview";
import DiscountedPreview from "./preview/DiscountedPreview";
import DiscountPreview from "./preview/DiscountPreview";
//import DraggableItem from '../DraggableItem';
//import { PriceBlockElementKey } from '../types';
//import { GRID_SIZE, NUM_COLUMNS, NUM_COLUMNS_BADGE, NUM_ROWS } from '../PriceBlockGrid';

export const GRID_SIZE = 18;
export const NUM_ROWS = 20;
export const NUM_COLUMNS = 20;
export const NUM_COLUMNS_BADGE = 24;
export const LIMIT_TOP_ROW_BADGE = -4;

interface IGenericPreviewProps {
  keyElement: PriceBlockElementKey;
}

export type { IGenericPreviewProps };

type LookupElement = { [key in PriceBlockElementKey]: FC<IGenericPreviewProps> };
const lookupContent: Partial<LookupElement> = {
  [PriceBlockElementKey.FULLPRICE]: FullPricePreview,
  [PriceBlockElementKey.DISCOUNTED]: DiscountedPreview,
  [PriceBlockElementKey.DISCOUNT]: DiscountPreview
  /* 	[PriceBlockElementKey.DISCOUNT]: DiscountPreview,
	[PriceBlockElementKey.DISCOUNTED]: DiscountedPreview,
	[PriceBlockElementKey.BADGE]: BadgePreview,
	[PriceBlockElementKey.CUSTOMFIELD_1]: CustomFieldPreview,
	[PriceBlockElementKey.CUSTOMFIELD_2]: CustomFieldPreview,
	[PriceBlockElementKey.CUSTOMFIELD_3]: CustomFieldPreview, */
};

const Item = (props) => {
  const item = props.item;

  const currentStyle = useMemo(() => {
    if (!item) return {};
    const { position } = item;
    return {
      bottom: (NUM_COLUMNS - position.rowEnd) * GRID_SIZE,
      left: position.colStart * GRID_SIZE,
      width: (position.colEnd - position.colStart) * GRID_SIZE,
      height: (position.rowEnd - position.rowStart) * GRID_SIZE,
      zIndex: item.layer
    };
  }, []);

  const Component = lookupContent[props.id];

  return (
    <div style={currentStyle}>
      <Component {...props} />
    </div>
  );
};

const Elements = ({ elements, settings }) => {
  const style = useMemo(() => {
    return {
      height: NUM_ROWS * GRID_SIZE,
      width: NUM_COLUMNS * GRID_SIZE
    };
  }, []);

  return (
    <div style={style}>
      {Object.keys(elements).map((keyElement) => {
        return (
          <Item
            properties={elements[keyElement].properties}
            item={elements[keyElement]}
            settings={settings}
            key={keyElement}
            id={keyElement as any}
          />
        );
      })}
    </div>
  );
};

export default Elements;

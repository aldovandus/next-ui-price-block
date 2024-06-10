/* eslint-disable @typescript-eslint/no-explicit-any */
//import usePriceBlockStore from '@/zustand/price-block/priceBlock';
import { CSSProperties, FC, useMemo } from "react";
import {
  IGenericPreviewProps,
  IPriceBlockElement,
  IPriceBlockElements,
  IPriceBlockSettings,
  PriceBlockElementKey,
  PriceBlockGenericProperties
} from "./types";
import FullPricePreview from "./preview/FullPricePreview";
import DiscountedPreview from "./preview/DiscountedPreview";
import DiscountPreview from "./preview/DiscountPreview";
import CustomFieldPreview from "./preview/CustomFieldPreview";
import BadgePreview from "./preview/BadgePreview";
//import DraggableItem from '../DraggableItem';
//import { PriceBlockElementKey } from '../types';
//import { GRID_SIZE, NUM_COLUMNS, NUM_COLUMNS_BADGE, NUM_ROWS } from '../PriceBlockGrid';

export const GRID_SIZE = 4.8;
export const NUM_ROWS = 20;
export const NUM_COLUMNS = 20;
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
  [PriceBlockElementKey.CUSTOMFIELD_3]: CustomFieldPreview
};

// Props for the Item component
interface ItemProps {
  id?: PriceBlockElementKey;
  item?: IPriceBlockElement<any>;
  settings: IPriceBlockSettings;
  properties?: PriceBlockGenericProperties;
}

const Item = (props: ItemProps) => {
  const { item } = props;
  const currentStyle = useMemo(() => {
    if (!item) return {};
    const { position } = item;
    return {
      position: "absolute",
      bottom: (NUM_COLUMNS - position.rowEnd) * GRID_SIZE,
      left: position.colStart * GRID_SIZE,
      width: (position.colEnd - position.colStart) * GRID_SIZE,
      height: (position.rowEnd - position.rowStart) * GRID_SIZE,
      zIndex: item.layer
    };
  }, [item]);

  const Component = lookupContent[props.id as PriceBlockElementKey] as any;

  return (
    <div style={currentStyle as CSSProperties}>
      <Component {...props} />
    </div>
  );
};

const Elements = ({ elements, settings }: { elements: IPriceBlockElements; settings: IPriceBlockSettings }) => {
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

        return <Item properties={element?.properties} item={element} settings={settings} key={keyElement} id={keyElement as PriceBlockElementKey} />;
      })}
    </div>
  );
};

export default Elements;

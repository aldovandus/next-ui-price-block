/* eslint-disable @typescript-eslint/no-explicit-any */
//import usePriceBlockStore from '@/zustand/price-block/priceBlock';
import { CSSProperties, FC, useMemo } from "react";
import {
  DynamicPriceBlockElementKey,
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
import { usePriceBlockStore } from "../zustand/price-block-store";
import UnitTypePreview from "./preview/UnitTypePreview";
//import DraggableItem from '../DraggableItem';
//import { PriceBlockElementKey } from '../types';
//import { GRID_SIZE, NUM_COLUMNS, NUM_COLUMNS_BADGE, NUM_ROWS } from '../PriceBlockGrid';

/* export const GRID_SIZE = 12;
export const NUM_ROWS = 17;
export const NUM_COLUMNS = 8; */
export const NUM_COLUMNS_BADGE = 24;
export const LIMIT_TOP_ROW_BADGE = -4;

const customFieldIndex = 100;

type LookupElement = { [key in DynamicPriceBlockElementKey]: FC<IGenericPreviewProps> };
const lookupContent: Partial<LookupElement> = {
  [PriceBlockElementKey.FULLPRICE]: FullPricePreview,
  [PriceBlockElementKey.DISCOUNT]: DiscountPreview,
  [PriceBlockElementKey.DISCOUNTED]: DiscountedPreview,
  [PriceBlockElementKey.BADGE]: BadgePreview,
  [PriceBlockElementKey.UNIT_TYPE]: UnitTypePreview
  /*  ["customfield_1"]: CustomFieldPreview,
  ["customfield_2"]: CustomFieldPreview,
  ["customfield_3"]: CustomFieldPreview,
  ["customfield_10"]: CustomFieldPreview,
  ["customfield_9"]: CustomFieldPreview,
  ["customfield_6"]: CustomFieldPreview,
  ["customfield_5"]: CustomFieldPreview */
};

for (let i = 0; i < customFieldIndex; i++) {
  lookupContent[`customfield_${i}` as DynamicPriceBlockElementKey] = CustomFieldPreview;
}

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
      position: "absolute",
      bottom: (numRows - position.rowEnd) * gridSize,
      left: position.colStart * gridSize,
      width: (position.colEnd - position.colStart) * gridSize,
      height: (position.rowEnd - position.rowStart) * gridSize,
      zIndex: item.layer
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

  /* return <div>{Object.keys(elements).map((item) => item.split("customfield_"))}</div>;

  return <div>{JSON.stringify(Object.keys(elements))}</div>; */
  return (
    <div className="h-full w-full  ">
      {Object.keys(elements).map((elementKeyIndex) => {
        const element = elements[elementKeyIndex as PriceBlockElementKey];

        return (
          <Item
            elementKey={elementKey}
            properties={element?.properties}
            item={element}
            settings={settings}
            key={`${elementKey}_${elementKeyIndex}`}
            id={elementKeyIndex as PriceBlockElementKey}
          />
        );
      })}
    </div>
  );
};

export default Elements;

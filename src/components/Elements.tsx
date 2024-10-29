/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, FC, useMemo } from 'react';
import {
  DynamicPriceBlockElementKey,
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
import UnitTypePreview from './preview/UnitTypePreview';
import StaticCustomFieldPreview from './preview/StaticCustomFieldPreview';
//import DraggableItem from '../DraggableItem';
//import { PriceBlockElementKey } from '../types';
//import { GRID_SIZE, NUM_COLUMNS, NUM_COLUMNS_BADGE, NUM_ROWS } from '../PriceBlockGrid';

/* export const GRID_SIZE = 12;
export const NUM_ROWS = 17;
export const NUM_COLUMNS = 8; */
export const NUM_COLUMNS_BADGE = 24;

const customFieldIndex = 100;

type LookupElement = { [key in DynamicPriceBlockElementKey]: FC<IGenericPreviewProps> };
const lookupContent: Partial<LookupElement> = {
  [PriceBlockElementKey.FULLPRICE]: FullPricePreview,
  [PriceBlockElementKey.DISCOUNT]: DiscountPreview,
  [PriceBlockElementKey.DISCOUNTED]: DiscountedPreview,
  [PriceBlockElementKey.BADGE]: BadgePreview,
  [PriceBlockElementKey.UNIT_TYPE]: UnitTypePreview,
};

for (let i = 0; i < customFieldIndex; i++) {
  lookupContent[`customfield_${i}` as DynamicPriceBlockElementKey] = CustomFieldPreview;
}
for (let i = 0; i < customFieldIndex; i++) {
  lookupContent[`static_customfield_${i}` as DynamicPriceBlockElementKey] = StaticCustomFieldPreview;
}

// Props for the Item component
interface ItemProps {
  id?: PriceBlockElementKey;
  item?: IPriceBlockElement<any>;
  settings: IPriceBlockSettings;
  properties?: PriceBlockGenericProperties;
  numRows: number;
  gridSize: number;
  elementKey: string;
}

const Item = (props: ItemProps) => {
  const { item, gridSize, numRows } = props;
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

const Elements = ({
  elementKey,
  elements,
  settings,
  numRows,
  gridSize,
}: {
  elementKey: string;
  elements: IPriceBlockElements;
  settings: IPriceBlockSettings;
  numRows: number;
  gridSize: number;
}) => {
  return (
    <div className="h-full w-full">
      {Object.keys(elements).map((elementKeyIndex) => {
        const element = elements[elementKeyIndex as PriceBlockElementKey];

        return (
          <Item
            elementKey={elementKey}
            properties={element?.properties}
            item={element}
            numRows={numRows}
            gridSize={gridSize}
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

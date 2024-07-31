/* eslint-disable @typescript-eslint/no-explicit-any */
type Currency = '€' | '$' | '£';

enum FontStyle {
  NORMAL = 'normal',
  ITALIC = 'italic',
  BOLD = 'bold',
}

enum PriceFormatType {
  TYPE1 = 'type1',
  TYPE2 = 'type2',
  TYPE3 = 'type3',
  TYPE4 = 'type4',
}

enum AlignText {
  RIGHT = 'right',
  CENTER = 'center',
  LEFT = 'left',
}

enum PriceBlockElementKey {
  FULLPRICE = 'fullPrice',
  DISCOUNT = 'discount',
  DISCOUNTED = 'discounted',
  BADGE = 'badge',
  CUSTOMFIELD_1 = 'customfield_1',
  CUSTOMFIELD_2 = 'customfield_2',
  CUSTOMFIELD_3 = 'customfield_3',
}

interface IPriceBlockPosition {
  rowStart: number;
  rowEnd: number;
  colStart: number;
  colEnd: number;
}

interface IPriceBlockFont {
  family: string;
  size: string;
  style: FontStyle;
  color: string;
  align: AlignText;
  fontBorder: {
    isEnabled: boolean;
    width: string;
    color: string;
  };
}

interface IPriceBlockShadow {
  offsetX?: string;
  offsetY?: string;
  blur?: string;
  color?: string;
}

interface IPriceBlockPadding {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface IPriceBlockBorder {
  color?: string;
  thickness?: {
    left?: string;
    top?: string;
    right?: string;
    bottom?: string;
  };
  radius?: {
    tl?: string;
    tr?: string;
    bl?: string;
    br?: string;
  };
}

interface IPriceBlockFormat {
  isEnable: boolean;
  type?: PriceFormatType;
}

interface IPriceBlockBox {
  color?: string;
  border?: IPriceBlockBorder;
  shadow?: IPriceBlockShadow;
  padding?: IPriceBlockPadding;
  url?: string;
}

interface IBadgeProperties {
  url?: string;
  rotate: number;
  size: number;
}

interface IFullPriceProperties {
  showCurrency: boolean;
  font: IPriceBlockFont;
  showCrossedLine: boolean;
  rotateCrossedLine: number;
  crossedLineHeight: number;
  box?: IPriceBlockBox;
}

interface IDiscountProperties {
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
}

interface IDiscountedProperties {
  showCurrency: boolean;
  format: IPriceBlockFormat;
  font: IPriceBlockFont;
  showFontBorder: boolean;
  box?: IPriceBlockBox;
}

interface ICustomFieldProperties {
  font: IPriceBlockFont;
  box?: IPriceBlockBox;
}

type PriceBlockGenericProperties = IBadgeProperties | IFullPriceProperties | IDiscountProperties | IDiscountedProperties | ICustomFieldProperties;

interface IPriceBlockElement<T extends PriceBlockGenericProperties> {
  label: string;
  position: IPriceBlockPosition;
  layer: number;
  properties: T;
}

type IPriceBlockElements = { [key in PriceBlockElementKey]?: IPriceBlockElement<PriceBlockGenericProperties> };

interface PriceBLockForSave {
  settings: IPriceBlockSettings;
  priceBlockElements: IPriceBlockElements;
}

interface IPriceBlockSettings {
  name: string;
  currency: Currency;
  showGrid: boolean;
  separator: {
    decimal: string;
    thousand: string;
  };
  background: {
    type: 'image' | 'color' | 'nothing';
    color?: string;
    url?: string;
  };
}

interface IGenericPreviewProps {
  elementKey: string;
  settings: IPriceBlockSettings;
  properties: any; // Puoi sostituire 'any' con un tipo più specifico se conosci la struttura di 'properties'
}

export type { IGenericPreviewProps };

export type {
  Currency,
  IPriceBlockFont,
  IPriceBlockBox,
  IPriceBlockSettings,
  IPriceBlockElements,
  IPriceBlockPosition,
  IPriceBlockElement,
  PriceBlockGenericProperties,
  IBadgeProperties,
  IFullPriceProperties,
  IDiscountProperties,
  IDiscountedProperties,
  ICustomFieldProperties,
  PriceBLockForSave,
};
export { PriceFormatType, PriceBlockElementKey, FontStyle, AlignText };

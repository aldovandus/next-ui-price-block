import type { IDiscountedProperties, IPriceBlockSettings } from '../types';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import SeparateNumberFormatted from '../separate-number-formatted/SeparateNumberFormatted';
import { usePriceBlockStore } from '../../zustand/price-block-store';

const DiscountedPreview = ({
  elementKey,
  settings,
  properties,
}: {
  elementKey: string;
  settings: IPriceBlockSettings;
  properties: IDiscountedProperties;
}) => {
  //const element = priceBlockElements[PriceBlockElementKey.DISCOUNTED] as IPriceBlockElement<IDiscountedProperties>;
  const boxStyle = useBoxStyle({ box: properties.box });
  const fontStyle = useFontStyle({ font: properties.font });
  const discountedValue = usePriceBlockStore((state) => state.dataComp[elementKey]?.discountedValue);

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!properties || !discountedValue) return null;

  return (
    <div className={'flex h-full w-full flex-col justify-center'} style={getStyle}>
      <SeparateNumberFormatted
        thousandSeparator={settings.separator.thousand}
        decimalSeparator={settings.separator.decimal}
        showCurrency={properties.showCurrency}
        fontSize={properties.font.size}
        currency={settings.currency}
        value={parseFloat(discountedValue)}
        type={properties.format.isEnable ? properties.format.type : undefined}
      />
    </div>
  );
};

export default DiscountedPreview;

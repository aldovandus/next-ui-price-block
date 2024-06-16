//import usePriceBlockStore from '@/zustand/price-block/priceBlock';
import type { CSSProperties } from "react";
import { useMemo } from "react";
import classNames from "classnames";
import { IFullPriceProperties, IPriceBlockSettings } from "../types";
import SeparateNumberFormatted from "../separate-number-formatted/SeparateNumberFormatted";
import useBoxStyle from "../../hooks/useBoxStyle";
import useFontStyle from "../../hooks/useFontStyle";
import { usePriceBlockStore } from "../../zustand/price-block-store";

/* const settings = {
	currency: '¤',
	separator: {
		thousand: '',
		decimal: '',
	},
}; */

interface Props {
  settings?: IPriceBlockSettings;
  properties?: IFullPriceProperties;
}

const FullPricePreview = ({ settings, properties }: Props) => {
  //const settings = usePriceBlockStore((state) => state.settings);
  //const priceBlockElements = usePriceBlockStore((state) => state.priceBlockElements);
  //const element = priceBlockElements[PriceBlockElementKey.FULLPRICE] as IPriceBlockElement<IFullPriceProperties>;
  //const element = priceBlockElements[0];
  const boxStyle = useBoxStyle({ box: properties?.box });
  const fontStyle = useFontStyle({ font: properties?.font });

  const fullPriceValue = usePriceBlockStore((state) => state.fullPriceValue);

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  console.log({ fontStyle });

  const renderCrossedLine = useMemo(() => {
    if (!properties?.showCrossedLine) return null;
    const style = {
      backgroundColor: properties.font.color,
      transform: `rotate(${properties.rotateCrossedLine ?? ""}deg)`,
      height: `${properties.crossedLineHeight}px`
    };
    return <div className="absolute w-[90%]" style={style}></div>;
  }, [properties]);

  if (!properties) return null;

  return (
    <div className={classNames("flex h-full w-full flex-col justify-center", { relative: properties.showCrossedLine })} style={getStyle}>
      {renderCrossedLine}
      <SeparateNumberFormatted
        thousandSeparator={settings?.separator.thousand}
        decimalSeparator={settings?.separator.decimal}
        showCurrency={properties.showCurrency}
        fontSize={properties.font.size}
        currency={settings?.currency}
        value={fullPriceValue ? parseFloat(fullPriceValue) : properties.exampleContent}
      />
    </div>
  );
};

export default FullPricePreview;

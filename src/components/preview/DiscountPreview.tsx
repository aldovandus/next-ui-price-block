import type { IDiscountProperties, IPriceBlockElement } from "../types";
import { PriceBlockElementKey } from "../types";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import useBoxStyle from "../../hooks/useBoxStyle";
import useFontStyle from "../../hooks/useFontStyle";
import classNames from "classnames";
import type { IGenericPreviewProps } from "./types";

const DiscountPreview = ({ settings, properties }: IGenericPreviewProps) => {
  //const element = priceBlockElements[PriceBlockElementKey.DISCOUNT] as IPriceBlockElement<IDiscountProperties>;
  const boxStyle = useBoxStyle({ box: properties.box });
  const fontStyle = useFontStyle({ font: properties.font });

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!properties) return null;

  return (
    <div className={classNames("flex h-full w-full flex-col justify-center")} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: properties.exampleContent }} />
    </div>
  );
};

export default DiscountPreview;

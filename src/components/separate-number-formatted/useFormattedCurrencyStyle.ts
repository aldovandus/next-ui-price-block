import classNames from "classnames";
import type { CSSProperties } from "react";
import { PriceFormatType } from "../types";
import { getProportionedSize } from "../../hooks/get-proportioned-size";

type Props = {
  className?: string;
  fontSize: string;
  type?: PriceFormatType;
};

const useFormattedCurrencyStyle = ({ className, fontSize, type }: Props) => {
  if (!type)
    return {
      containerClass: className,
      decimalClass: "flex gap-2",
      integerStyle: { fontSize: `${getProportionedSize(fontSize)}` },
      decimalStyle: { fontSize: `${getProportionedSize(fontSize)}` },
      currencyStyle: { fontSize: `${getProportionedSize(fontSize)}` }
    };

  const isType1 = type == PriceFormatType.TYPE1;
  const isType2 = type == PriceFormatType.TYPE2;
  const isType3 = type == PriceFormatType.TYPE3;
  const isType4 = type == PriceFormatType.TYPE4;

  const containerClass = classNames(className, { "items-end": isType1 }, { "items-center": isType4 || isType3 });
  const decimalClass = classNames("flex gap-1", { "flex-col-reverse  flex-col": isType3 });
  const integerStyle: CSSProperties = {
    fontSize: `${getProportionedSize(fontSize)}`,
    lineHeight: isType3 ? `calc(${getProportionedSize(fontSize)} - 10%)` : undefined
  };
  const decimalContainerStyle: CSSProperties = { lineHeight: isType3 ? `calc(${getProportionedSize(fontSize)} - 60%)` : undefined };
  const currencyStyle: CSSProperties = { fontSize: `calc(${getProportionedSize(fontSize)} - 25%)` };
  const decimalStyle = { fontSize: `calc(${getProportionedSize(fontSize)} - 25%)` };

  return {
    containerClass,
    decimalClass,
    integerStyle,
    decimalContainerStyle,
    currencyStyle,
    decimalStyle
  };
};

export { useFormattedCurrencyStyle };

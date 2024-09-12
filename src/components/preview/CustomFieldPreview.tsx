import type { CSSProperties } from "react";
import { useMemo } from "react";
import useBoxStyle from "../../hooks/useBoxStyle";
import useFontStyle from "../../hooks/useFontStyle";
import classNames from "classnames";
import { ICustomFieldProperties, PriceBlockElementKey } from "../types";
import { usePriceBlockStore } from "../../zustand/price-block-store";

const CustomFieldPreview = ({
  id,
  elementKey,
  properties
}: {
  id?: PriceBlockElementKey;
  elementKey: string;
  properties: ICustomFieldProperties;
}) => {
  const currentCustomField = usePriceBlockStore((state) => state.getCurrentCustomField(elementKey, id));

  const boxStyle = useBoxStyle({ box: properties.box });
  const fontStyle = useFontStyle({ font: properties.font });

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!currentCustomField?.value || currentCustomField.value.length === 0) return null;
  return (
    <div className={classNames("flex h-full w-full flex-col justify-center")} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: currentCustomField.value }} />
    </div>
  );
};

export default CustomFieldPreview;

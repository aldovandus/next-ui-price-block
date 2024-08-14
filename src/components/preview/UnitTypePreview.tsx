import { usePriceBlockStore } from "../../zustand/price-block-store";
import type { CSSProperties } from "react";
import { useMemo } from "react";
import useBoxStyle from "../../hooks/useBoxStyle";
import useFontStyle from "../../hooks/useFontStyle";
import classNames from "classnames";
import type { IGenericPreviewProps } from "../types";

const UnitTypePreview = ({ elementKey, properties }: IGenericPreviewProps) => {
  const unitType = usePriceBlockStore((state) => state.dataComp[elementKey]?.unitType);

  const boxStyle = useBoxStyle({ box: properties.box });
  const fontStyle = useFontStyle({ font: properties.font });
  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!unitType || !properties) return null;

  return (
    <div className={classNames("flex h-full w-full flex-col justify-center")} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: unitType }} />
    </div>
  );
};

export default UnitTypePreview;

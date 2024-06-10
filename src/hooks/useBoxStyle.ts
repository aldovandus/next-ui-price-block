import type { CSSProperties } from "react";
import { getProportionedSize } from "./get-proportioned-size";
import { IPriceBlockBox } from "@/components/types";

interface IUseBoxStyleProps {
  box: IPriceBlockBox | undefined;
}

const useBoxStyle = ({ box }: IUseBoxStyleProps): CSSProperties => {
  let style: CSSProperties = {
    backgroundColor: box?.color ?? "transparent"
  };

  if (box?.border?.thickness) {
    style = {
      ...style,
      borderTop: `${box?.border?.thickness.top ? getProportionedSize(box?.border?.thickness.top) : "0px"} solid ${
        box?.border?.color ?? "transparent"
      }`,
      borderLeft: `${box?.border?.thickness.left ? getProportionedSize(box?.border.thickness.left) : "0px"} solid ${
        box?.border?.color ?? "transparent"
      }`,
      borderBottom: `${box?.border?.thickness.bottom ? getProportionedSize(box?.border?.thickness.bottom) : "0"} solid ${
        box?.border?.color ?? "transparent"
      }`,
      borderRight: `${box?.border?.thickness.right ? getProportionedSize(box?.border?.thickness.right) : "0"} solid ${
        box?.border?.color ?? "transparent"
      }`
    };
  }

  if (box?.padding) {
    style = {
      ...style,
      paddingTop: box.padding.top ? getProportionedSize(box.padding.top) : "0px",
      paddingLeft: box.padding.left ? getProportionedSize(box.padding.left) : "0px",
      paddingRight: box.padding.right ? getProportionedSize(box.padding.right) : "0px",
      paddingBottom: box.padding.bottom ? getProportionedSize(box.padding.bottom) : "0px"
    };
  }

  if (box?.shadow) {
    style = {
      ...style,
      boxShadow: `${box.shadow.offsetX ? getProportionedSize(box.shadow.offsetX) : "0px"} ${
        box.shadow.offsetY ? getProportionedSize(box.shadow.offsetY) : "0px"
      } ${box.shadow.blur ? getProportionedSize(box.shadow.blur) : "0px"}  ${box.shadow.color ?? "transparent"}`
    };
  }

  if (box?.border?.radius) {
    style = {
      ...style,
      borderTopLeftRadius: box.border.radius.tl ?? "0px",
      borderTopRightRadius: box.border.radius.tr ?? "0px",
      borderBottomLeftRadius: box.border.radius.bl ?? "0px",
      borderBottomRightRadius: box.border.radius.br ?? "0px"
    };
  }

  if (box?.url) {
    style = {
      ...style,
      backgroundImage: `url("${box.url}")`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    };
  }

  return style;
};

export default useBoxStyle;

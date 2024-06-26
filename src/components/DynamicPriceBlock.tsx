import { useMemo } from "react";
import Elements, { GRID_SIZE, NUM_COLUMNS, NUM_ROWS } from "./Elements";

const jsonString =
  '"{"settings":{"name":"","currency":"€","showGrid":false,"separator":{"decimal":",","thousand":"."},"background":{"type":"nothing"}},"priceBlockElements":{"fullPrice":{"label":"full","layer":2,"position":{"rowStart":9,"rowEnd":17,"colStart":3,"colEnd":11},"properties":{"exampleContent":24.9,"showCurrency":true,"showCrossedLine":false,"rotateCrossedLine":0,"crossedLineHeight":2,"font":{"family":"Arial","size":"22unit","style":"normal","color":"#000000","align":"center","fontBorder":{"isEnabled":false,"color":"#000","width":"2unit"}},"box":{"color":"trasparent","border":{"color":"#161659","thickness":{"top":"0unit","bottom":"0unit","left":"0unit","right":"0unit"},"radius":{"tl":"0px","tr":"0px","bl":"0px","br":"0px"}},"shadow":{"offsetX":"0unit","offsetY":"0unit","blur":"0unit"},"padding":{"top":"0unit","right":"0unit","bottom":"0unit","left":"0unit"}}}}}}"';

const jsonString2 =
  '{"settings":{"name":"","currency":"€","showGrid":false,"separator":{"decimal":",","thousand":"."},"background":{"type":"nothing"}},"priceBlockElements":{"fullPrice":{"label":"full","layer":2,"position":{"colStart":0,"rowStart":0,"rowEnd":8,"colEnd":20},"properties":{"exampleContent":24.9,"showCurrency":true,"showCrossedLine":false,"rotateCrossedLine":0,"crossedLineHeight":2,"font":{"family":"Arial","size":"35unit","style":"normal","color":"#fafafa","align":"center","fontBorder":{"isEnabled":false,"color":"#000","width":"2unit"}},"box":{"color":"#e90808","border":{"color":"#161659","thickness":{"top":"0unit","bottom":"0unit","left":"0unit","right":"0unit"},"radius":{"tl":"0px","tr":"0px","bl":"0px","br":"0px"}},"shadow":{"offsetX":"0unit","offsetY":"0unit","blur":"0unit"},"padding":{"top":"0unit","right":"0unit","bottom":"0unit","left":"0unit"}}}},"discounted":{"label":"discounted","layer":1,"position":{"colStart":0,"rowStart":8,"rowEnd":20,"colEnd":20},"properties":{"exampleContent":30,"showCurrency":false,"format":{"isEnable":false},"showFontBorder":false,"font":{"family":"Arial","size":"41unit","style":"bold","color":"#fffdfd","align":"right","fontBorder":{"isEnabled":false,"color":"#000","width":"2unit"}},"box":{"color":"#3b0aeb","border":{"color":"#1009e6","thickness":{"top":"0unit","bottom":"0unit","left":"0unit","right":"0unit"},"radius":{"tl":"0px","tr":"0px","bl":"0px","br":"0px"}},"shadow":{"offsetX":"0unit","offsetY":"0unit","blur":"0unit"},"padding":{"top":"0unit","right":"10unit","bottom":"0unit","left":"0unit"}}}}}}';

const cleanedString = jsonString2.slice(1, -1);

// Trasforma la stringa in un oggetto JavaScript
//const jsonObject = JSON.parse(JSON.stringify(jsonString2));

const jsonObject = JSON.parse(jsonString2);

const DynamicPriceBlock = ({ priceBlockJson }: any) => {
  console.log(priceBlockJson);

  const background = priceBlockJson.settings.background;

  const getBackground = useMemo(() => {
    if (background.type == "image") {
      return `url(${background.url}) center center / contain no-repeat`;
    } else if (background.type == "color") {
      return background.color;
    } else {
      return "none";
    }
  }, [background.color, background.type, background.url]);

  if (!priceBlockJson) return null;
  return (
    <div
      className="relative"
      style={{
        background: getBackground,
        height: NUM_ROWS * GRID_SIZE,
        width: NUM_COLUMNS * GRID_SIZE
      }}
    >
      <Elements elements={priceBlockJson.priceBlockElements} settings={priceBlockJson.settings} />
    </div>
  );
};

export default DynamicPriceBlock;

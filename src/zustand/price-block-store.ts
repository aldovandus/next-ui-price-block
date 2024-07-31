/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface PriceBlockStoreState {
  dataComp: Record<
    string,
    { discount: string; fullPriceValue?: string; discountedValue?: string; textCustom1?: string; textCustom2?: string; textCustom3?: string }
  >;
  gridSize: number;
  numRows: number;
  numCols: number;
  isLoading?: boolean;
  setGridSize(_: number): void;
  setNumRows(_: number): void;
  setNumCols(_: number): void;
  setLoading(_: boolean): void;
  initPriceBlockReader(elementKey: string, state: any): void;
}

function addCssToDocument(cssText: string) {
  const currentExtraFonts = document.querySelectorAll('.extra-fonts');
  if (currentExtraFonts.length > 0) {
    currentExtraFonts.forEach((current) => current.remove());
  }
  const styleElement = document.createElement('style');
  styleElement.classList.add('extra-fonts');
  styleElement.appendChild(document.createTextNode(cssText));
  document.head.appendChild(styleElement);
}

function cssToJson(cssText: string) {
  const cssJson = [];
  const fontFaceRegex = /@font-face\s*{([^}]*)}/g;
  let match: any;

  while ((match = fontFaceRegex.exec(cssText)) !== null) {
    const cssRule = match[1].trim();
    const ruleJson: any = {};

    cssRule.split(';').forEach((declaration: { trim: () => { (): any; new (): any; length: number }; split: (arg0: string) => [any, any] }) => {
      if (declaration.trim().length === 0) return;
      const [property, value] = declaration.split(':');
      ruleJson[property.trim()] = value.trim();
    });

    cssJson.push(ruleJson);
  }

  return cssJson;
}

const getExtraFonts = async (url: string) => {
  const res = await fetch(url);
  const cssText = await res.text();
  const cssJson = cssToJson(cssText);
  addCssToDocument(cssText);
  console.log(JSON.stringify(cssJson, null, 2));
  return cssJson;
};

const usePriceBlockStore = create<PriceBlockStoreState>((set, get) => ({
  gridSize: 18,
  numRows: 20,
  numCols: 20,
  discount: '20%',
  isLoading: false,
  dataComp: {},

  initPriceBlockReader: async (elementKey, state: any) => {
    const { gridSize, numRows, numCols, fontsUrl, discount, fullPriceValue, discountedValue, textCustom1, textCustom2, textCustom3 } = state;

    if (fontsUrl) {
      await getExtraFonts(fontsUrl);
    }

    set({
      gridSize,
      numRows,
      numCols,
      dataComp: { ...get().dataComp, [elementKey]: { discount, fullPriceValue, discountedValue, textCustom1, textCustom2, textCustom3 } },
    });
  },

  setGridSize: (value: number) => set({ gridSize: value }),
  setNumRows: (value: number) => set({ numRows: value }),
  setNumCols: (value: number) => set({ numCols: value }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));

export { usePriceBlockStore };

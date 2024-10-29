/* eslint-disable @typescript-eslint/no-explicit-any */
import { PriceBlockElementKey } from '../components/types';
import { create } from 'zustand';

interface PriceBlockStoreState {
  dataComp: Record<
    string,
    {
      discount: string;
      fullPriceValue?: string;
      discountedValue?: string;
      unitType?: string;
      textCustom?: { id: string; value: string }[];
    }
  >;
  getCurrentCustomField(elementKey: string, id?: PriceBlockElementKey): { id: string; value: string } | undefined;
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
  return cssJson;
};

const usePriceBlockStore = create<PriceBlockStoreState>((set, get) => ({
  dataComp: {},

  initPriceBlockReader: async (elementKey, state: any) => {
    const { fontsUrl, discount, fullPriceValue, discountedValue, unitType, textCustom } = state;

    if (fontsUrl) await getExtraFonts(fontsUrl);

    set({ dataComp: { ...get().dataComp, [elementKey]: { discount, fullPriceValue, discountedValue, unitType, textCustom } } });
  },

  getCurrentCustomField: (elementKey: string, id: PriceBlockElementKey) => {
    const textCustom = get().dataComp[elementKey]?.textCustom;

    const currentCustomField = textCustom?.find((t) => t.id === id);
    return currentCustomField;
  },
}));

export { usePriceBlockStore };

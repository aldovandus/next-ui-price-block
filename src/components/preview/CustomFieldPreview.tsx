import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { ICustomFieldProperties, PriceBlockElementKey } from '../types';
import { usePriceBlockStore } from '@/zustand/price-block-store';

const CustomFieldPreview = ({
  id,
  elementKey,
  properties,
}: {
  id?: PriceBlockElementKey;
  elementKey: string;
  properties: ICustomFieldProperties;
}) => {
  const { textCustom1, textCustom2, textCustom3 } = usePriceBlockStore((state) => state.dataComp[elementKey] ?? {});

  //MEMO: ottimizzare logica in zustand
  let textCustom = null;
  if (id == PriceBlockElementKey.CUSTOMFIELD_1 && textCustom1) textCustom = textCustom1;
  else if (id == PriceBlockElementKey.CUSTOMFIELD_2 && textCustom2) textCustom = textCustom2;
  else if (id == PriceBlockElementKey.CUSTOMFIELD_3 && textCustom3) textCustom = textCustom3;

  const boxStyle = useBoxStyle({ box: properties.box });
  const fontStyle = useFontStyle({ font: properties.font });

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!textCustom) return null;
  return (
    <div className={classNames('flex h-full w-full flex-col justify-center')} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: textCustom }} />
    </div>
  );
};

export default CustomFieldPreview;

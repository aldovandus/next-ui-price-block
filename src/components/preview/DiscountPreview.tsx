import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';
import { IDiscountedProperties } from '../types';
import { usePriceBlockStore } from '../../zustand/price-block-store';

const DiscountPreview = ({ elementKey, properties, gridSize }: { elementKey: string; properties: IDiscountedProperties; gridSize: number }) => {
  const boxStyle = useBoxStyle({ gridSize, box: properties.box });
  const fontStyle = useFontStyle({ gridSize, font: properties.font });

  const discount = usePriceBlockStore((state) => state.dataComp[elementKey]?.discount);

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!properties || !discount) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center')} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: discount }} />
    </div>
  );
};

export default DiscountPreview;

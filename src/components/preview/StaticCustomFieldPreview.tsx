import type { IStaticCustomFieldProperties, PriceBlockElementKey } from '../types';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import useBoxStyle from '../../hooks/useBoxStyle';
import useFontStyle from '../../hooks/useFontStyle';
import classNames from 'classnames';

const StaticCustomFieldPreview = ({
  properties,
  gridSize,
}: {
  id?: PriceBlockElementKey;
  elementKey: string;
  properties: IStaticCustomFieldProperties;
  gridSize: number;
}) => {
  const boxStyle = useBoxStyle({ gridSize, box: properties.box });
  const fontStyle = useFontStyle({ gridSize, font: properties.font });

  const getStyle = useMemo((): CSSProperties => {
    return { ...boxStyle, ...fontStyle };
  }, [boxStyle, fontStyle]);

  if (!properties) return null;

  return (
    <div className={classNames('flex h-full w-full flex-col justify-center')} style={getStyle}>
      <div dangerouslySetInnerHTML={{ __html: properties?.exampleContent }} />
    </div>
  );
};

export default StaticCustomFieldPreview;

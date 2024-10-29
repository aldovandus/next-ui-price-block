/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import { isEmpty } from 'lodash-es';

function BadgePreview({ properties }: any) {
  const getStyle = useMemo((): CSSProperties => {
    const style: CSSProperties = {
      backgroundImage: !isEmpty(properties.url) ? `url("${properties.url}")` : 'none',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: properties.size == 100 ? 'contain' : `${properties.size}%`,
      transform: `rotate(${properties.rotate}deg)`,
    };

    return style;
  }, [properties.rotate, properties.size, properties.url]);

  return (
    <div className="z-100 relative flex h-full w-full items-center justify-center" style={getStyle}>
      {/* 			{isEmpty(element.properties.url) && <SaasIcon icon='image_search' className={'h-16 w-16'} />}
       */}{' '}
    </div>
  );
}

export default BadgePreview;

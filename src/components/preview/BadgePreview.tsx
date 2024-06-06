import usePriceBlockStore from '@/zustand/price-block/priceBlock';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';
import type { IPriceBlockElement, IBadgeProperties } from '../types';
import { PriceBlockElementKey } from '../types';
import type { IGenericPreviewProps } from './types';
import { isEmpty } from 'lodash-es';
import { SaasIcon } from '@/components/saas-icon';

function BadgePreview({}: IGenericPreviewProps) {
	const priceBlockElements = usePriceBlockStore((state) => state.priceBlockElements);
	const element = priceBlockElements[PriceBlockElementKey.BADGE] as IPriceBlockElement<IBadgeProperties>;

	const getStyle = useMemo((): CSSProperties => {
		const style: CSSProperties = {
			backgroundImage: !isEmpty(element.properties.url) ? `url("${element.properties.url}")` : 'none',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundSize: element.properties.size == 100 ? 'contain' : `${element.properties.size}%`,
			transform: `rotate(${element.properties.rotate}deg)`,
		};

		return style;
	}, [element]);

	return (
		<div className='z-100 relative flex h-full w-full items-center justify-center' style={getStyle}>
			{isEmpty(element.properties.url) && <SaasIcon icon='image_search' className={'h-16 w-16'} />}
		</div>
	);
}

export default BadgePreview;

import classNames from 'classnames';
import type { CSSProperties } from 'react';
import { PriceFormatType } from '../types';

type Props = {
	className?: string;
	fontSize: string;
	type?: PriceFormatType;
};

const useFormattedCurrencyStyle = ({ className, fontSize, type }: Props) => {
	if (!type)
		return {
			containerClass: className,
			decimalClass: 'flex gap-2',
			integerStyle: { fontSize: `${fontSize}px` },
			decimalStyle: { fontSize: `${fontSize}px` },
			currencyStyle: { fontSize: `${fontSize}px` },
		};

	const isType1 = type == PriceFormatType.TYPE1;
	const isType2 = type == PriceFormatType.TYPE2;
	const isType3 = type == PriceFormatType.TYPE3;
	const isType4 = type == PriceFormatType.TYPE4;

	const containerClass = classNames(className, { 'items-end': isType1 }, { 'items-center': isType4 || isType3 });
	const decimalClass = classNames('flex gap-2', { 'flex-col-reverse  flex-col': isType3 });
	const integerStyle: CSSProperties = { fontSize: `${fontSize}px`, lineHeight: isType3 ? `calc(${fontSize}px - 10%)` : undefined };
	const decimalContainerStyle: CSSProperties = { lineHeight: isType3 ? `calc(${fontSize}px - 60%)` : undefined };
	const currencyStyle: CSSProperties = { fontSize: `calc(${fontSize}px - 60%)` };
	const decimalStyle = { fontSize: `calc(${fontSize}px - 45%)` };

	return {
		containerClass,
		decimalClass,
		integerStyle,
		decimalContainerStyle,
		currencyStyle,
		decimalStyle,
	};
};

export { useFormattedCurrencyStyle };

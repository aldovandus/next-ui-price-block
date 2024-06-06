import type { CSSProperties } from 'react';
import { getProportionedSize } from './get-proportioned-size';
import { AlignText, FontStyle, IPriceBlockFont } from '../components/types';

interface IUseFontStyleProps {
	font: IPriceBlockFont | undefined;
}

const useFontStyle = ({ font }: IUseFontStyleProps): CSSProperties => {
	const style: CSSProperties = {
		fontFamily: font?.family,
		fontSize: getProportionedSize(font?.size),
		fontStyle: font?.style != FontStyle.BOLD ? font?.style : 'normal',
		fontWeight: font?.style == FontStyle.BOLD ? 'bold' : 'normal',
		color: font?.color,
		alignItems: font?.align == AlignText.LEFT ? 'flex-start' : font?.align == AlignText.RIGHT ? 'flex-end' : 'center',
		WebkitTextStrokeWidth: font?.fontBorder?.isEnabled ? (font?.fontBorder?.width ? getProportionedSize(font?.fontBorder?.width) : '0') : '0',
		WebkitTextStrokeColor: font?.fontBorder?.color,
	};

	return style;
};

export default useFontStyle;

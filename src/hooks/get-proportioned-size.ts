import { GRID_SIZE } from '../components/Elements';

const getProportionedSize = (size?: string) => {
	if (size?.includes('unit')) {
		return parseFloat(size) * (GRID_SIZE / 10) + 'px';
	}
};

export { getProportionedSize };

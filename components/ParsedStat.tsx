import { moneyFmt } from 'constants';
import type { ITransaction } from 'types';

export interface IParsedStatProps {
	isCount?: boolean;
	isDollar?: boolean;
	name: string;
	statFunc: (transactions: ITransaction[]) => number;
	transactions: ITransaction[];
}

export const ParsedStat = (
	{ isCount, isDollar, name, transactions, statFunc }: IParsedStatProps,
) => {
	const value = statFunc(transactions);

	return (
		<div>
			<p>{name}</p>
			<p>
				{isCount
					? value.toFixed(0)
					: (isDollar ? moneyFmt.format(value) : value.toFixed(2))}
			</p>
		</div>
	);
};

export default ParsedStat;

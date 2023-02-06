import type { ITransaction } from 'types';

export interface IParsedStatProps {
	isDollar?: boolean;
	name: string;
	statFunc: (transactions: ITransaction[]) => number;
	transactions: ITransaction[];
}

export const ParsedStat = (
	{ isDollar, name, transactions, statFunc }: IParsedStatProps,
) => {
	const value = statFunc(transactions);

	return (
		<div>
			<p>{name}</p>
			<p>{isDollar ? `$${value}` : value.toFixed(2)}</p>
		</div>
	);
};

export default ParsedStat;

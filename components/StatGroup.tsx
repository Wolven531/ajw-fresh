import type { ITransaction } from 'types';
import { ParsedStat } from './ParsedStat.tsx';

export interface IStatGroupProps {
	name: keyof ITransaction;
	transactions: ITransaction[];
	className?: string;
}

export const StatGroup = (
	{ className, name, transactions }: IStatGroupProps,
) => {
	const capitalized = name[0].toUpperCase().concat(name.substring(1));

	const mapToNums = (tran: ITransaction) => tran[name] as number;

	return (
		<div
			className={'border-1 m-1'.concat(className ? ` ${className}` : '')}
		>
			<ParsedStat
				isCount
				name={`Total ${capitalized} transactions`}
				statFunc={(trans) => trans.length}
				transactions={transactions}
			/>
			<ParsedStat
				isDollar
				name={`Total ${capitalized}`}
				statFunc={(trans) =>
					trans.map(mapToNums)
						.reduce(
							(runningSum, v) => runningSum + v,
							0,
						)}
				transactions={transactions}
			/>
			<ParsedStat
				isDollar
				name={`Average ${capitalized} transaction`}
				statFunc={(trans) => {
					const nums = trans.map(mapToNums);
					const sum = nums.reduce(
						(runningSum, v) => runningSum + v,
						0,
					);

					return sum / nums.length;
				}}
				transactions={transactions}
			/>
		</div>
	);
};

export default StatGroup;

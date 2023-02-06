import type { IParsedTable } from 'types';
import { ParsedStat } from './ParsedStat.tsx';

export interface IParsedTableProps {
	table: IParsedTable;
}

export const ParsedTable = ({ table }: IParsedTableProps) => {
	return (
		<section className='border-1 border-green-300'>
			<h4 className='font-bold'>
				{table.title}
			</h4>
			<ParsedStat
				isCount
				name='Total rows'
				statFunc={(trans) => trans.length}
				transactions={table.rows}
			/>
			<div className='grid grid-cols-2'>
				<div className='border-1 border-green-500 m-1'>
					<ParsedStat
						isCount
						name='Total credit transactions'
						statFunc={(trans) =>
							trans.filter(({ credit }) => credit > 0).length}
						transactions={table.rows}
					/>
					<ParsedStat
						isDollar
						name='Total credit'
						statFunc={(trans) =>
							trans.filter(({ credit }) => credit > 0).map((
								{ credit },
							) => credit).reduce(
								(total, c) => total + c,
								0,
							)}
						transactions={table.rows}
					/>
					<ParsedStat
						isDollar
						name='Average credit transaction'
						statFunc={(trans) => {
							const credits = trans.filter(({ credit }) =>
								credit > 0
							)
								.map((
									{ credit },
								) => credit);
							const total = credits.reduce(
								(total, c) => total + c,
								0,
							);

							return total / credits.length;
						}}
						transactions={table.rows}
					/>
				</div>
				<div className='border-1 border-red-300 m-1'>
					<ParsedStat
						isCount
						name='Total debit transactions'
						statFunc={(trans) =>
							trans.filter(({ debit }) => debit > 0).length}
						transactions={table.rows}
					/>
					<ParsedStat
						isDollar
						name='Total debit'
						statFunc={(trans) =>
							trans.filter(({ debit }) => debit > 0).map((
								{ debit },
							) => debit).reduce(
								(total, d) => total + d,
								0,
							)}
						transactions={table.rows}
					/>
					<ParsedStat
						isDollar
						name='Average debit transaction'
						statFunc={(trans) => {
							const debits = trans.filter(({ debit }) =>
								debit > 0
							)
								.map((
									{ debit },
								) => debit);
							const total = debits.reduce(
								(total, d) => total + d,
								0,
							);

							return total / debits.length;
						}}
						transactions={table.rows}
					/>
				</div>
			</div>
			{/* {table.columnTitles.map((col) => <p key={col}>{col}</p>)} */}
		</section>
	);
};

export default ParsedTable;

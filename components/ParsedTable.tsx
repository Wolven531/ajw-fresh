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
				name='Total rows'
				statFunc={(trans) => trans.length}
				transactions={table.rows}
			/>
			<ParsedStat
				name='Total credit'
				statFunc={(trans) =>
					trans.map(({ credit }) => credit).reduce(
						(total, c) => total + c,
						0,
					)}
				transactions={table.rows}
			/>
			<ParsedStat
				name='Total debit'
				statFunc={(trans) =>
					trans.map(({ debit }) => debit).reduce(
						(total, d) => total + d,
						0,
					)}
				transactions={table.rows}
			/>
			{/* {table.columnTitles.map((col) => <p key={col}>{col}</p>)} */}
		</section>
	);
};

export default ParsedTable;

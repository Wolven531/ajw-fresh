import type { IParsedTable } from 'types';
import { ParsedStat } from './ParsedStat.tsx';
import { StatGroup } from './StatGroup.tsx';

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
				<StatGroup
					className='border-green-500'
					name='credit'
					transactions={table.rows.filter(({ credit }) => credit > 0)}
				/>
				<StatGroup
					className='border-red-300'
					name='debit'
					transactions={table.rows.filter(({ debit }) => debit > 0)}
				/>
			</div>
		</section>
	);
};

export default ParsedTable;

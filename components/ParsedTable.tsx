import type { IParsedTable, ITransaction } from 'types';
import { ParsedStat } from './ParsedStat.tsx';
import { StatGroup } from './StatGroup.tsx';

export interface IParsedTableProps {
	table: IParsedTable;
}

export const ParsedTable = ({ table }: IParsedTableProps) => {
	const credits: ITransaction[] = [];
	const debits: ITransaction[] = [];
	const other: ITransaction[] = [];

	table.rows.forEach((t) => {
		if (t.credit > 0 && t.debit === 0) {
			credits.push(t);
		} else if (t.debit > 0 && t.credit === 0) {
			debits.push(t);
		} else {
			other.push(t);
		}
	});

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
					transactions={credits}
				/>
				<StatGroup
					className='border-red-300'
					name='debit'
					transactions={debits}
				/>
				{other.length > 0 && (
					<div className='border-2 border-yellow-800 col-span-2 my-1 py-1'>
						<h3>Other ({other.length} rows)</h3>
						{other.map((t) => (
							<div
								className='border-1 border-yellow-600 my-1'
								key={t.description}
							>
								<p>Description - "{t.description}"</p>
								<p>Symbol - "{t.symbol}"</p>
								<p>Credit = {t.credit} Debit = {t.debit}</p>
								<p>Quantity = {t.quantity} Price = {t.price}</p>
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default ParsedTable;

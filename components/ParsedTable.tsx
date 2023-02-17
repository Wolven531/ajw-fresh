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
								{t.symbol.length > 0 && (
									<p>Symbol - "{t.symbol}"</p>
								)}
								{t.credit > 0 && <p>Credit = {t.credit}</p>}
								{t.debit > 0 && <p>Debit = {t.debit}</p>}
								{t.quantity > 0 && (
									<p>Quantity = {t.quantity}</p>
								)}
								{t.price > 0 && <p>Price = {t.price}</p>}
							</div>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default ParsedTable;

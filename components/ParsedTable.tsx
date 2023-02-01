import type { IParsedTable } from 'types';

export interface IParsedTableProps {
	table: IParsedTable;
}

export const ParsedTable = ({ table }: IParsedTableProps) => {
	return (
		<section className='border-1 border-green-300'>
			<h4 className='font-bold'>
				{table.title} ({table.rows.length} rows)
			</h4>
			{table.columnTitles.map((col) => <p key={col}>{col}</p>)}
		</section>
	);
};

export default ParsedTable;

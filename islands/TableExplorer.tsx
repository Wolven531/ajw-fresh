import type { FunctionComponent } from 'preact';
import type { IParsedTable } from 'types';
import { ParsedTable } from '../components/ParsedTable.tsx';

export interface ITableExplorerProps {
	tables: IParsedTable[];
}

export const TableExplorer: FunctionComponent<ITableExplorerProps> = (
	{ tables },
) => {
	if (tables.length < 1) {
		return (
			<>
				<h3>No tables parsed</h3>
			</>
		);
	}

	return (
		<>
			<h3>Parsed Tables</h3>
			{tables.map((table, ind) => (
				<ParsedTable
					key={table.title.concat('-', String(ind))}
					table={table}
				/>
			))}
		</>
	);
};

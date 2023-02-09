import {
	DEFAULT_COLUMN_TITLE,
	DEFAULT_TABLE_TITLE,
	PATTERN_DECIMAL,
} from 'constants';
import type { FunctionComponent, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { IParsedTable, ITransaction } from 'types';
import { Button } from '../components/Button.tsx';
import { ParsedTable } from '../components/ParsedTable.tsx';
import { ValidationService } from '../services/ValidationService.ts';

/**
 * This island features a form which parses HTML files into user friendly display
 */
export const HtmlParserForm: FunctionComponent = () => {
	const [parsedTables, setParsedTables] = useState<IParsedTable[]>([]);

	const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (evt) => {
		evt.preventDefault();

		console.info('About to parse file');
		// console.info(evt);

		const target = evt.target as HTMLFormElement;
		const fileInput = target.querySelector('input[type=\'file\'');
		const { files } = fileInput as HTMLInputElement;
		const fileItem = files?.item(0);

		// console.info(fileItem);

		fileItem?.text().then((fileText) => {
			// console.info(fileText);

			const parsed = parseInfo(fileText);
			setParsedTables(parsed);
		});
	};

	useEffect(() => {
		console.info('[HtmlParserForm] Loaded');
	}, []);

	return (
		<article className='border-1 border-black'>
			<h2 className='font-bold mb-2'>HTML Parser Form</h2>
			<form onSubmit={handleSubmit}>
				<input
					accept='.html'
					className='block border-1 border-black mx-auto p-1 text-center'
					type='file'
				/>
				<Button
					className='border-1 border-green-900 my-2 p-1 hover:bg-green-700 hover:text-white hover:font-bold'
					type='submit'
				>
					Parse
				</Button>
			</form>
			{parsedTables.length > 0 && (
				<>
					<h3>Parsed Tables</h3>
					{parsedTables.map((table, ind) => (
						<ParsedTable
							key={table.title.concat('-', String(ind))}
							table={table}
						/>
					))}
				</>
			)}
		</article>
	);
};

/**
 * This function parses a numeric value from a string
 *
 * @param val String or null value to parse
 */
const parseNumber = (val: string | null): number => {
	if (val === null || val.length < 1) {
		return 0;
	}

	const trimmed = val.trim().replaceAll(',', '');

	const matches = trimmed.match(PATTERN_DECIMAL);

	if (!matches) {
		console.warn(
			`[parseNumber] Encountered value w/ odd pattern - "${trimmed}". Using 0 in its place.`,
		);

		return 0;
	}

	return parseFloat(matches[1]); // use the first captured group
};

/**
 * This function parses a quantity value from a string
 *
 * @param val String or null value to parse
 */
const parseQuantity = (
	val: string | null,
	rowDetails: Record<string, unknown>,
): number => {
	if (val === null || val.length < 1) {
		return 0;
	}

	const trimmed = val.trim().replaceAll(',', '');

	const matches = trimmed.match(PATTERN_DECIMAL);

	if (!matches) {
		console.warn(
			`[parseQuantity] Encountered value w/ odd pattern - "${trimmed}". Using 0 in its place.`,
			rowDetails,
		);

		return 0;
	}

	return parseFloat(matches[1]); // use the first captured group
};

/**
 * This function parses an HTML string for a row of HTML containing transaction data
 *
 * @param rowHtml String of HTML to parse
 */
const parseActivityRow = (row: HTMLTableRowElement): ITransaction => {
	const cells = row.querySelectorAll('td');

	if (cells.length < 1) {
		console.warn(
			`[parseActivityRow] Unable to parse row, using UNKNOWN`,
			row,
		);

		return {
			accountType: 'UNKNOWN',
			credit: 0,
			date: 'UNKNOWN',
			debit: 0,
			description: 'UNKNOWN',
			price: 0,
			quantity: 0,
			symbol: 'UNKNOWN',
			transactionType: 'UNKNOWN',
		};
	}

	const [
		cellDescription,
		cellSymbol,
		cellAccountType,
		cellTransaction,
		cellDate,
		cellQuantity,
		cellPrice,
		cellDebit,
		cellCredit,
	] = Array.from(cells);

	return {
		accountType: cellAccountType.textContent ?? '',
		credit: parseNumber(cellCredit.textContent),
		date: cellDate.textContent ?? '',
		debit: parseNumber(cellDebit.textContent),
		description: cellDescription.textContent ?? '',
		price: parseNumber(cellPrice.textContent),
		quantity: parseQuantity(cellQuantity.textContent, {
			AccountType: cellAccountType.textContent,
			Credit: cellCredit.textContent,
			Date: cellDate.textContent,
			Debit: cellDebit.textContent,
			Description: cellDescription.textContent,
			Price: cellPrice.textContent,
			Quantity: cellQuantity.textContent,
			Symbol: cellSymbol.textContent,
			Transaction: cellTransaction.textContent,
		}),
		symbol: cellSymbol.textContent ?? '',
		transactionType: cellTransaction.textContent ?? '',
	};
};

/**
 * This function parses the Account Activity HTML table for transaction data
 *
 * @param table HTML table to parse
 */
const parseAccountActivityTable = (table: HTMLTableElement) => {
	const theadRows = table.querySelectorAll('thead > tr');
	// first thead row is table name and other info, so use second for cols
	const columns = Array.from(theadRows.item(1).querySelectorAll('th'));
	const allRows = Array.from(table.querySelectorAll('tr'));
	const allRowsButHeader = allRows.filter((row) =>
		row.parentElement?.tagName !== 'THEAD'
	);

	return {
		columnTitles: columns.map((col) =>
			col.textContent?.trim() ?? DEFAULT_COLUMN_TITLE
		),
		originalHTML: table.outerHTML,
		// do NOT include rows from inside the thead
		rows: allRowsButHeader.map(parseActivityRow),
		title: 'Account Activity',
	};
};

/**
 * This function uses the web DOMParser API to parse HTML into more useful info
 *
 * @param htmlText String of HTML to parse
 */
const parseInfo = (htmlText: string): IParsedTable[] => {
	if (!ValidationService.isRobinhoodDocument(htmlText)) {
		console.warn('Unsupported file');
		return [];
	}

	const parser = new DOMParser();
	const doc = parser.parseFromString(htmlText, 'text/html');

	// processing
	const tables = Array.from(doc.querySelectorAll('table'));
	const parsedTables: IParsedTable[] = [];
	const unknownTables: HTMLTableElement[] = [];

	tables.forEach((table) => {
		const thead = table.querySelector('thead');

		if (!thead) {
			console.warn('missing thead');
			unknownTables.push(table);

			return;
		}

		const theadRows = table.querySelectorAll('thead > tr');

		if (theadRows.length < 2) {
			console.warn('missing thead rows');
			unknownTables.push(table);

			return;
		}

		const header = theadRows.item(0).querySelector('h3');

		if (!header) {
			console.warn('missing header');
			unknownTables.push(table);

			return;
		}

		const title = header.textContent?.trim() ?? DEFAULT_TABLE_TITLE;

		// ONLY parse Account Activity for now
		if (title === 'Account Activity') {
			parsedTables.push(parseAccountActivityTable(table));
		} else {
			console.info(`skipping table "${title}"`);
		}
	});

	if (unknownTables.length > 0) {
		console.warn('Unknown tables follow below');
		console.warn(unknownTables);
	}

	console.info('parsed the following tables');
	console.log(parsedTables);

	return parsedTables;
};

export default HtmlParserForm;

import {
	DEFAULT_COLUMN_TITLE,
	DEFAULT_TABLE_TITLE,
	PATTERN_DECIMAL,
} from 'constants';
import type { IParsedTable, ITransaction } from 'types';
import { ValidationService } from './services/ValidationService.ts';

/**
 * This function parses the Account Activity HTML table for transaction data
 *
 * @param table HTML table to parse
 */
export const parseAccountActivityTable = (table: HTMLTableElement) => {
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
 * This function parses an HTML string for a row of HTML containing transaction data
 *
 * @param rowHtml String of HTML to parse
 */
export const parseActivityRow = (row: HTMLTableRowElement): ITransaction => {
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
 * This function uses the web DOMParser API to parse HTML into more useful info
 *
 * @param htmlText String of HTML to parse
 */
export const parseInfo = (htmlText: string): IParsedTable[] => {
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

/**
 * This function parses a numeric value from a string
 *
 * @param val String or null value to parse
 */
export const parseNumber = (val: string | null): number => {
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
export const parseQuantity = (
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

import type { FunctionComponent, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { IParsedTable } from 'types';
import { Button } from '../components/Button.tsx';
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
						<section
							className='border-1 border-green-300'
							key={table.title.concat('-', String(ind))}
						>
							<h4 className='font-bold'>
								{table.title} ({table.rows.length} rows)
							</h4>
							{table.columnTitles.map((col) => (
								<p key={col}>{col}</p>
							))}
						</section>
					))}
				</>
			)}
		</article>
	);
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

	tables.forEach((table) => {
		const thead = table.querySelector('thead');

		if (!thead) {
			return;
		}

		const theadRows = thead.querySelectorAll('tr');

		if (theadRows.length < 2) {
			return;
		}

		const header = theadRows.item(0).querySelector('h3');
		const columns = Array.from(theadRows.item(1).querySelectorAll('th'));
		const allRows = Array.from(table.querySelectorAll('tr'));

		if (!header) {
			return;
		}

		parsedTables.push({
			columnTitles: columns.map((col) => col.textContent?.trim() ?? ''),
			title: header.textContent?.trim() ?? '',
			// slice 1 to remove header row
			rows: allRows.slice(1).map((row) => row.outerHTML),
		});

		// console.info(header.textContent?.trim());
		// console.info(columns.map((col) => col.textContent?.trim()).join(', '));

		// console.table(
		// 	header.textContent?.trim(),
		// 	columns.map((col) => col.textContent?.trim() ?? ''),
		// );
	});

	return parsedTables;
};

export default HtmlParserForm;

import type { FunctionComponent, JSX } from 'preact';
import { useEffect } from 'preact/hooks';
import { Button } from '../components/Button.tsx';

/**
 * This island features a form which parses HTML files into user friendly display
 */
export const HtmlParserForm: FunctionComponent = () => {
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

			parseInfo(fileText);
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
		</article>
	);
};

/**
 * This function uses the web DOMParser API to parse HTML into more useful info
 *
 * @param htmlText String of HTML to parse
 */
const parseInfo = (htmlText: string) => {
	const parser = new DOMParser();

	const doc = parser.parseFromString(htmlText, 'text/html');

	// validation
	let err: string | undefined;

	const title = doc.querySelector('title');

	if (!title) {
		err = 'Unable to parse document title';
	} else if (title.textContent !== 'Robinhood') {
		err = 'Unsupported file';
	}

	if (err) {
		console.warn(err);
		return;
	}

	// processing
	const tables = Array.from(doc.querySelectorAll('table'));

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

		if (!header) {
			return;
		}

		// console.info(header.textContent?.trim());
		// console.info(columns.map((col) => col.textContent?.trim()).join(', '));

		console.table(
			header.textContent?.trim(),
			columns.map((col) => col.textContent?.trim() ?? ''),
		);
	});
};

export default HtmlParserForm;

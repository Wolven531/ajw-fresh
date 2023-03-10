import type { FunctionComponent, JSX } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import type { IParsedTable } from 'types';
import { parseInfo } from 'utils';
import { Button } from '../components/Button.tsx';
import { TableExplorer } from './TableExplorer.tsx';

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
			<TableExplorer tables={parsedTables} />
		</article>
	);
};

export default HtmlParserForm;

import type { FunctionComponent, JSX } from 'preact';
import { useEffect } from 'preact/hooks';

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
				<input type='file' className='block border-1 border-black mx-auto p-1 text-center' />
				<button
					type='submit'
					className='border-1 border-green-900 my-2 p-1 hover:bg-green-700 hover:text-white hover:font-bold'
				>
					Parse
				</button>
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

	const theads = Array.from(doc.querySelectorAll('table > thead'));

	console.info(theads.map((thead) => thead.textContent?.trim()));
};

export default HtmlParserForm;

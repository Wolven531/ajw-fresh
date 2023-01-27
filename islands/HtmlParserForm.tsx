import type { FunctionComponent, JSX } from 'preact';
import { useEffect } from 'preact/hooks';

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
			<h2 className='font-bold'>HTML Parser Form</h2>
			<form onSubmit={handleSubmit}>
				<input type='file' />
				<br />
				<button type='submit'>Parse</button>
			</form>
		</article>
	);
};

const parseInfo = (htmlText: string) => {
	const parser = new DOMParser();

	const doc = parser.parseFromString(htmlText, 'text/html');

	const theads = Array.from(doc.querySelectorAll('table > thead'));

	console.info(theads.map((thead) => thead.textContent?.trim()));
};

export default HtmlParserForm;

import type { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

export const HtmlParserForm: FunctionComponent = () => {
	const handleSubmit = () => {
		console.info('About to parse file');
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

export default HtmlParserForm;

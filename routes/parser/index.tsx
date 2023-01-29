import { Head } from '$fresh/runtime.ts';
import type { Handlers } from '$fresh/server.ts';
import { Navigation } from '../../components/Navigation.tsx';
import { HtmlParserForm } from '../../islands/HtmlParserForm.tsx';

export const handler: Handlers = {
	GET: async (req, ctx) => {
		console.info('Parse page got hit!');

		const resp = await ctx.render();

		resp.headers.set('X-Custom-Header', 'Anthony Williams wuz heer');

		return resp;
	},
};

export const ParsePage = () => {
	return (
		<>
			<Head>
				<title>Parser</title>
			</Head>
			<main className='border-2 border-blue-500 p-1 align-middle text-center max-w-md m-auto mt-1'>
				<Navigation />
				<article className='mb-2'>
					<h3 className='font-bold'>First things first</h3>
					<ol className='list-decimal list-inside text-left'>
						<li>
							This tool does not upload information to a server
						</li>
						<li>
							This tool parses all files locally (in your browser)
						</li>
						<li>
							This tool is provided "as-is", and may have bugs
						</li>
						<li>
							Current Supported Formats
							<ul className='text-center'>
								<li>Robinhood monthly statement HTML export</li>
							</ul>
						</li>
					</ol>
				</article>
				<HtmlParserForm />
			</main>
		</>
	);
};

export default ParsePage;

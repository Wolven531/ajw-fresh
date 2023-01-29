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
				<HtmlParserForm />
				<Navigation />
			</main>
		</>
	);
};

export default ParsePage;

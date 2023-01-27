import type { Handlers } from '$fresh/server.ts';
import { HtmlParserForm } from '../islands/HtmlParserForm.tsx';
import { TitleSetter } from '../islands/TitleSetter.tsx';

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
		<div className='border-2 border-blue-500 p-1 align-middle text-center max-w-md m-auto mt-1'>
			<TitleSetter windowTitle='Parser Page' />
			<HtmlParserForm />
		</div>
	);
};

export default ParsePage;

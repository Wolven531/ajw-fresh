import type { Handlers } from '$fresh/server.ts';
import Counter from '../islands/Counter.tsx';

export const handler: Handlers = {
	GET: async (req, ctx) => {
		console.info('Home page got hit!');

		const resp = await ctx.render();

		resp.headers.set('X-Custom-Header', 'Anthony Williams wuz heer');

		return resp;
	},
};

export default function HomePage() {
	return (
		<div>
			<img
				alt='the fresh logo: a sliced lemon dripping with juice'
				height='100px'
				src='/logo.svg'
			/>
			<p>Hello</p>
			<Counter start={3} />
		</div>
	);
}

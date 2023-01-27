import type { Handlers } from '$fresh/server.ts';
// import { useEffect } from 'preact/hooks';
import { Changelog } from '../components/Changelog.tsx';
import TitleSetter from '../islands/TitleSetter.tsx';
// import Counter from '../islands/Counter.tsx';
import logs from '../static/changelog.json' assert { type: 'json' };

export const handler: Handlers = {
	GET: async (req, ctx) => {
		console.info('Home page got hit!');

		const resp = await ctx.render();

		resp.headers.set('X-Custom-Header', 'Anthony Williams wuz heer');

		return resp;
	},
};

const HomePage = () => {
	return (
		<div className='border-2 border-blue-500 p-1 align-middle text-center max-w-md m-auto mt-1'>
			<img
				alt='the fresh logo: a sliced lemon dripping with juice'
				className='m-auto p-2'
				height='100px'
				src='/logo.svg'
			/>
			{
				/* <p>Hello</p>
					<Counter start={3} />
				*/
			}
			<TitleSetter windowTitle='Home' />
			<Changelog logs={logs} />
		</div>
	);
};

export default HomePage;

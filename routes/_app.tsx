import { Head } from '$fresh/runtime.ts';
import { AppProps } from '$fresh/server.ts';

export default function App(props: AppProps) {
	return (
		<>
			<Head>
				<meta name='author' content='Anthony Williams' />
				<meta
					name='description'
					content='Website by Anthony Williams, built using Fresh + Deno'
				/>
			</Head>
			<props.Component />
		</>
	);
}

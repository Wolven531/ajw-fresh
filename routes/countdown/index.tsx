import { Head } from '$fresh/runtime.ts';
import { Navigation } from '../../components/Navigation.tsx';
import { Countdown } from '../../islands/Countdown.tsx';

export default function Page() {
	const oneMinMs = 1000 * 60;
	const now = Date.now();
	const targetTimestamp = new Date(now + oneMinMs).getTime();

	return (
		<>
			<Head>
				<title>Countdown</title>
			</Head>
			<main className='border-2 border-blue-500 p-1 align-middle text-center max-w-md m-auto mt-1'>
				<Navigation />
				<h1 className='font-bold'>Countdown</h1>
				<p>
					The big event is happening{' '}
					<Countdown targetTimestamp={targetTimestamp} />.
				</p>
			</main>
		</>
	);
}

import { Navigation } from '../components/Navigation.tsx';
import Countdown from '../islands/Countdown.tsx';
import TitleSetter from '../islands/TitleSetter.tsx';

export default function Page() {
	const now = Date.now();
	const targetTimestamp = new Date(now + 1000 * 60).getTime();

	return (
		<main className='border-2 border-blue-500 p-1 align-middle text-center max-w-md m-auto mt-1'>
			<h1 className='font-bold'>Countdown</h1>
			<p>
				The big event is happening{' '}
				<Countdown targetTimestamp={targetTimestamp} />.
			</p>
			<TitleSetter windowTitle='Countdown' />
			<Navigation />
		</main>
	);
}

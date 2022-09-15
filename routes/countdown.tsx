import Countdown from '../islands/Countdown.tsx';

export default function Page() {
	const now = Date.now();
	const targetTimestamp = new Date(now + 1000 * 60).getTime();

	return (
		<p>
			The big event is happening{' '}
			<Countdown targetTimestamp={targetTimestamp} />.
		</p>
	);
}

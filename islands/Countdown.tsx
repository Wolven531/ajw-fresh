/** @jsx h */
import { h } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';

const timeFmt = new Intl.RelativeTimeFormat('en-US');

export default function Countdown(props: { targetTimestamp: string }) {
	const targetTimestamp = new Date(props.targetTimestamp).getTime();

	const [runningTimestamp, setRunningTimestamp] = useState(Date.now());

	// create interval to update `runningTimestamp` every second with current
	// timestamp, as long as component is mounted
	useEffect(() => {
		const timer = setInterval(() => {
			setRunningTimestamp((previousTimestamp) => {
				if (previousTimestamp > targetTimestamp) {
					clearInterval(timer);
				}

				return Date.now();
			});
		}, 1000);

		return () => clearInterval(timer);
	}, [props.targetTimestamp]);

	// format remaining time using `Intl.RelativeTimeFormat`
	const secondsLeft = useMemo(() =>
		timeFmt.format(
			Math.floor(
				(targetTimestamp - runningTimestamp) / 1000,
			),
			'seconds',
		), [runningTimestamp, targetTimestamp, timeFmt]);

	// if target has passed, stop counting down
	if (runningTimestamp > targetTimestamp) {
		return <span>🎉</span>;
	}

	return <span>{secondsLeft}</span>;
}

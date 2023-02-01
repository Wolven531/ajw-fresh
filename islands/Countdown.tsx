import type { FunctionComponent } from 'preact';
import { useEffect, useMemo, useState } from 'preact/hooks';
import { timeFmt } from '../constants.ts';

/**
 * Properties to pass to Countdown island
 */
export interface ICountdownProps {
	/**
	 * Timestamp (UTC milliseconds) until render changes
	 */
	targetTimestamp: number;
}

/**
 * This island features a display that automatically counts down to a target time,
 * then changes the display after the time has occurred
 */
export const Countdown: FunctionComponent<ICountdownProps> = (
	{ targetTimestamp },
) => {
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

		return () => {
			clearInterval(timer);
		};
	}, [targetTimestamp]);

	// format remaining time using `Intl.RelativeTimeFormat`
	const secondsLeft = useMemo(() =>
		timeFmt.format(
			Math.floor(
				(targetTimestamp - runningTimestamp) / 1000,
			),
			'seconds',
		), [runningTimestamp, targetTimestamp]);

	// target has passed, stop counting down
	if (runningTimestamp > targetTimestamp) {
		return <span>🎉</span>;
	}

	return <span>{secondsLeft}</span>;
};

export default Countdown;

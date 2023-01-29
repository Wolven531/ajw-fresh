import type { FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Button } from '../components/Button.tsx';

/**
 * Properties to pass to Counter island
 */
export interface ICounterProps {
	/**
	 * Initial number to render
	 */
	start: number;
}

/**
 * This island features a numeric count display that can be incremented or decremented
 */
export const Counter: FunctionComponent<ICounterProps> = (
	props: ICounterProps,
) => {
	const [count, setCount] = useState(props.start);

	return (
		<>
			<p>{count}</p>
			<Button
				className='m-1 p-1 bg-red-300'
				onClick={() => setCount((oldCount) => oldCount - 1)}
			>
				-1
			</Button>
			<Button
				className='m-1 p-1 bg-green-300'
				onClick={() => setCount((oldCount) => oldCount + 1)}
			>
				+1
			</Button>
		</>
	);
};

export default Counter;

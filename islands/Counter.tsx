/** @jsx h */
import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Button } from '../components/Button.tsx';

interface CounterProps {
	start: number;
}

export default function Counter(props: CounterProps) {
	const [count, setCount] = useState(props.start);

	return (
		<div>
			<p>{count}</p>
			<Button onClick={() => setCount((oldCount) => oldCount - 1)}>
				-1
			</Button>
			<Button onClick={() => setCount((oldCount) => oldCount + 1)}>
				+1
			</Button>
		</div>
	);
}

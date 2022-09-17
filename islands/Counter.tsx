import { useState } from 'preact/hooks';
import { Button } from '../components/Button.tsx';

interface ICounterProps {
	start: number;
}

export default function Counter(props: ICounterProps) {
	const [count, setCount] = useState(props.start);

	return (
		<div>
			<p>{count}</p>
			<Button className='m-1 p-1 bg-red-300' onClick={() => setCount((oldCount) => oldCount - 1)}>
				-1
			</Button>
			<Button className='m-1 p-1 bg-green-300' onClick={() => setCount((oldCount) => oldCount + 1)}>
				+1
			</Button>
		</div>
	);
}

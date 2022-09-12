import { IS_BROWSER } from '$fresh/runtime.ts';
import type { JSX } from 'preact/jsx-runtime';

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			disabled={!IS_BROWSER || props.disabled}
		/>
	);
}

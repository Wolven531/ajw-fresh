/** @jsx h */
import { IS_BROWSER } from '$fresh/runtime.ts';
import { h } from 'preact';

export function Button(props: h.JSX.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			disabled={!IS_BROWSER || props.disabled}
		/>
	);
}

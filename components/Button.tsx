import { IS_BROWSER } from '$fresh/runtime.ts';
import type { JSX } from 'preact/jsx-runtime';

/**
 * This component is a wrapper for the base HTML button element, but is disabled until JS has been loaded
 *
 * @param props HTML <button> element props
 */
export const Button = (props: JSX.HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button
			{...props}
			disabled={!IS_BROWSER || props.disabled}
		/>
	);
};

export default Button;

import type { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

/**
 * Properties to pass to TitleSetter island
 */
export interface ITitleSetterProps {
	/**
	 * Value to assign to browser window title
	 */
	windowTitle: string;
}

/**
 * This island sets the browser window title when mounted; it has no visual appearance
 *
 * @deprecated Use `import { Head } from '$fresh/runtime.ts'` instead
 */
export const TitleSetter: FunctionComponent<ITitleSetterProps> = (props) => {
	useEffect(() => {
		window.document.title = props.windowTitle;
	}, [props.windowTitle]);

	// return <Fragment></Fragment>; // broken
	// return <></>; // broken
	// return null; // broken
	// return <h3>{props.windowTitle}</h3>;
	return <div style={{ display: 'none' }} />;
};

export default TitleSetter;

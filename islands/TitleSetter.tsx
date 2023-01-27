import { Fragment } from 'preact';
import type { FunctionComponent } from 'preact';
import { useEffect } from 'preact/hooks';

export interface ITitleSetterProps {
	windowTitle: string;
}

export const TitleSetter: FunctionComponent<ITitleSetterProps> = (props) => {
	useEffect(() => {
		window.document.title = props.windowTitle;
	}, [props.windowTitle]);

	// return <Fragment></Fragment>; // broken
	// return <></>; // broken
	// return null; // broken
	// return <h3>{props.windowTitle}</h3>;
	// return <div />;
	return <div style={{ display: 'none' }} />;
};

export default TitleSetter;

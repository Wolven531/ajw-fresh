/** @jsx h */
import type { PageProps } from '$fresh/server.ts';
import { h } from 'preact';

export default function Greet(props: PageProps) {
	return <div>Hello {props.params.name}</div>;
}

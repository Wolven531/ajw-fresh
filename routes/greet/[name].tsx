import type { PageProps } from '$fresh/server.ts';

export default function GreetPage(props: PageProps) {
	return <div>Hello {props.params.name}</div>;
}

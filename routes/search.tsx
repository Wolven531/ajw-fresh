/** @jsx h */
import type { Handlers, PageProps } from '$fresh/server.ts';
import { h } from 'preact';

const NAMES = ['alice', 'bob', 'charlie', 'dave', 'eve', 'frank'].sort();

interface IResponseData {
	query: string;
	results: string[];
}

export const handler: Handlers<IResponseData> = {
	GET: (req, ctx) => {
		const url = new URL(req.url);
		const query = url.searchParams.get('q') ?? '';
		const normalized = query.trim().toLowerCase();
		const results = NAMES.filter((name) => name.includes(normalized));

		return ctx.render({ results, query });
	},
};

export default function SearchPage({ data }: PageProps<IResponseData>) {
	const { results, query } = data;

	return (
		<div>
			<form action='search'// TODO(@wolven531) - why does specifying method attribute break form w/ a HTTP 405 response?
				// method='POST'
			>
				<input type='text' name='q' value={query} />
				<button type='submit'>Search</button>
			</form>
			{results.length < 1 && <h3>No results</h3>}
			{results.length > 0 && (
				<div>
					<h3>
						{results.length} result{results.length === 1 ? '' : 's'}
					</h3>
					<ul>
						{results.map((name) => <li key={name}>{name}</li>)}
					</ul>
				</div>
			)}
		</div>
	);
}

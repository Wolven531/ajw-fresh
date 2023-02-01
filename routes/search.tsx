import type { Handlers, PageProps } from '$fresh/server.ts';
import { NAMES } from 'constants';
import type { IResponseData } from 'types';
import { Button } from '../components/Button.tsx';

export const handler: Handlers<IResponseData> = {
	GET: (req, ctx) => {
		const url = new URL(req.url);
		const query = url.searchParams.get('q') ?? '';
		const normalized = query.trim().toLowerCase();
		const results = NAMES.filter((name) => name.includes(normalized));

		return ctx.render({ query, results });
	},
	POST: async (req, ctx) => {
		const form = await req.formData();

		const query = form.get('q')?.valueOf() as string ?? '';
		const normalized = query.trim().toLowerCase();
		const results = NAMES.filter((name) => name.includes(normalized));

		return ctx.render({ query, results });
	},
};

export default function SearchPage({ data }: PageProps<IResponseData>) {
	const { query, results } = data;

	return (
		<div>
			<form
				action='search'
				method='POST'
			>
				<input type='text' name='q' value={query} />
				<Button type='submit'>Search</Button>
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

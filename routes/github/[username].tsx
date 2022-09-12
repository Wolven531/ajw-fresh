import type { Handlers, PageProps } from '$fresh/server.ts';

interface IGithubUser {
	avatar_url: string;
	login: string;
	name: string;
}

export const handler: Handlers<IGithubUser> = {
	GET: async (_, ctx) => {
		const { username } = ctx.params;

		const resp = await fetch(`https://api.github.com/users/${username}`);

		if (resp.status === 404) {
			return ctx.render();
		}

		const user: IGithubUser = await resp.json();

		return ctx.render(user);
	},
};

export default function GithubSearchPage({ data }: PageProps<IGithubUser>) {
	if (!data) {
		return <h1>User not found</h1>;
	}

	return (
		<div>
			<img
				height={64}
				src={data.avatar_url}
				width={64}
			/>
			<h1>{data.name}</h1>
			<p>{data.login}</p>
		</div>
	);
}

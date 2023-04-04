import type { HandlerContext } from '$fresh/server.ts';
// import { Head } from '$fresh/runtime.ts';
// import { Navigation } from '../../components/Navigation.tsx';

export const handler = {
	GET: (_req: Request, _ctx: HandlerContext): Response => {
		return new Response(JSON.stringify([]), {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// return new Response(
		// 	'<html><body><p>got GET</p><form method="POST"><input type="submit" /></form></body></html>',
		// 	{
		// 		headers: {
		// 			'Content-Type': 'text/html',
		// 		},
		// 	},
		// );
	},
	POST: async (_req: Request, _ctx: HandlerContext): Promise<Response> => {
		const formData = await _req.formData().catch(() => ({}));
		const reqJson = await _req.json().catch(() => ({}));

		// return new Response('got POST');
		return new Response(
			`<html><a href="/api/rate">Back</a><body><p>Form Data</p><textarea>${
				JSON.stringify(formData, null, 2)
			}</textarea><p>JSON</p><textarea>${
				JSON.stringify(reqJson, null, 2)
			}</textarea></body></html>`,
			{
				headers: {
					'Content-Type': 'text/html',
				},
			},
		);
	},
};

// export const RatePage = () => {
// 	return (
// 		<>
// 			<Head>
// 				<title>Rate</title>
// 			</Head>
// 			<main className='border-2 border-blue-500 p-1 align-middle text-center max-w-md m-auto mt-1'>
// 				<p>got GET</p>
// 				<form method='POST'>
// 					<input type='submit' />
// 				</form>
// 			</main>
// 		</>
// 	);
// };

// export default RatePage;

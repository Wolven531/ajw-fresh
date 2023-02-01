import type { HandlerContext } from '$fresh/server.ts';
import { JOKES } from '../../constants.ts';

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
	const randomIndex = Math.floor(Math.random() * JOKES.length);
	const body = JOKES[randomIndex];

	return new Response(body);
};

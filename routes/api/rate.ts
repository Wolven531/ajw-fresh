import type { HandlerContext } from '$fresh/server.ts';

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
	return new Response('test response 2');
};

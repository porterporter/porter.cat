import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
	// Get the country from Vercel's environment variables
	const country = context.request.headers.get('x-vercel-ip-country') || '';
	const { pathname } = new URL(context.request.url);

	// Skip redirect for the construction page
	if (pathname === '/construccio.html') {
		return next();
	}

	console.log('Country:', country);

	// Redirect users from Spain or Portugal to the construction page
	if (['ES', 'PT'].includes(country)) {
		return new Response(null, {
			status: 302,
			headers: {
				Location: 'https://porter.cat/construccio.html',
			},
		});
	}

	return next();
};

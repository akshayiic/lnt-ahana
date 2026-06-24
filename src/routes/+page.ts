import { redirect } from '@sveltejs/kit';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export function load() {
	throw redirect(307, '/amenities');
}

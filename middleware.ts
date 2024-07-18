import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/construccio.html') return;
  if (['ES', 'PT'].includes(request.geo?.country ?? ''))
    return NextResponse.redirect(new URL('https:/porter.cat/construccio.html'));
}

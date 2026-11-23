import type { NextRequest } from 'next/server';

/** /app → /app/ so the owner app (Flutter web build in public/app) runs inside its service-worker scope.
 *  A plain Location header: Next's own redirect helper would strip the trailing slash again. */
export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname === '/app') {
    return new Response(null, { status: 308, headers: { Location: `${req.nextUrl.origin}/app/${req.nextUrl.search || ''}` } });
  }
}

export const config = { matcher: ['/app'] };

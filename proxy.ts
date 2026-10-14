
// создаем публичные url
import {NextRequest, NextResponse} from "next/server";

const PUBLIC_PATHS = new Set([
	'/', '/login', '/register',
])
// ф-ция проверки публичности url
function isPublicPath(pathname: string) {
	if(PUBLIC_PATHS.has(pathname)) return true;
	// if(pathName.startsWith('/api/')) return true;
	return false;
}

export function proxy(request: NextRequest) {
	const {pathname} = request.nextUrl;
	if (isPublicPath(pathname)){
		return NextResponse.next()
	}
	// url приватный, то проверяем авторизован ли
	const sessionCookie = request.cookies.get('authjs.session-token') ??
		request.cookies.get('__Secure-authjs.session-token')

	if(!sessionCookie?.value){
		return NextResponse.redirect(new URL('/login', request.url));
	}
	return NextResponse.next()
}

export const config = {
	matcher: [
		// Exclude API routes, static files, image optimizations, and .png files
		'/((?!api|_next/static|_next/image|.*\\.png$).*)',
	],
}
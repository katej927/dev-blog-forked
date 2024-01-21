export { default } from 'next-auth/middleware'

export const config = {
  matcher: [`/article/write`, '/article/edit/:path*'],
}

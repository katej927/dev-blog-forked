export const API_URL_FOR_SSR = process.env.NEXTAUTH_URL
export const API_URL_FOR_CSR =
  process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PROD_URL

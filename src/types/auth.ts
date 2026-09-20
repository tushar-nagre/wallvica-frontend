export type SignInInput = { email: string; password: string }
export type SignUpInput = SignInInput & { first_name: string; last_name: string; phone?: string }
export type TokenPair = { access_token: string; refresh_token: string; token_type: string }
export type CurrentUser = { id: string; email: string; first_name: string; last_name: string; role: 'CUSTOMER' | 'ADMIN' }

export interface JwtPayload {
  sub?: string;
  email?: string;
  role?: string;
  exp?: number;
  token: string
}

export interface TokenInfo {
  token: string;
  expiration: Date | null;
}
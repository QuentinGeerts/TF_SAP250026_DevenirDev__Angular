export interface JwtPayload {
  sub: string;
  email?: string;
  roles?: string[];
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

export interface TokenInfo {
  raw: string;
  header: Record<string, unknown>;
  payload: JwtPayload;
  isExpired: boolean;
  expiresAt: Date | null;
  remainingMs: number | null;
}
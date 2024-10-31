export interface JwtPayload {
    sub: number;
    email: string;
    accessLevel: string;
    iat: number;
    role: "USER" | "ADMIN"
  }
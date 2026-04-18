import crypto from "crypto";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "please-set-ADMIN_JWT_SECRET";
const ACCESS_TOKEN_EXP = 15 * 60; // 15 min
const REFRESH_TOKEN_EXP = 7 * 24 * 60 * 60; // 7 days

function base64UrlEncode(input: string | Buffer) {
  return Buffer.from(input instanceof Buffer ? input : input.toString())
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(input: string) {
  const padded = input.padEnd(input.length + (4 - (input.length % 4)) % 4, "=");
  return Buffer.from(padded.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString();
}

function hmacSha256(data: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(data).digest("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export type AdminJwtPayload = {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};

export function signAccessToken(sub: string, email: string, role: string) {
  const header = { alg: "HS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + ACCESS_TOKEN_EXP;
  const payload = { sub, email, role, iat, exp };
  const unsigned = `${base64UrlEncode(JSON.stringify(header))}.${base64UrlEncode(JSON.stringify(payload))}`;
  const signature = hmacSha256(unsigned, JWT_SECRET);
  return `${unsigned}.${signature}`;
}

export function verifyAccessToken(token: string): AdminJwtPayload | null {
  try {
    const [head, body, signature] = token.split(".");
    if (!head || !body || !signature) return null;
    const unsigned = `${head}.${body}`;
    const expected = hmacSha256(unsigned, JWT_SECRET);
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
    const payload = JSON.parse(base64UrlDecode(body)) as AdminJwtPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function signRefreshToken() {
  const token = crypto.randomBytes(64).toString("hex");
  const expiresAt = Math.floor(Date.now() / 1000) + REFRESH_TOKEN_EXP;
  const hash = hashToken(token);
  return { token, hash, expiresAt };
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function verifyRefreshToken(token: string, hash: string) {
  return hashToken(token) === hash;
}

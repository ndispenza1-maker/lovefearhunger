import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import pool from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "lfh-dev-secret-change-me";
const COOKIE_NAME = "lfh_session";

export interface User {
  id: number;
  email: string;
}

export function signToken(user: User): string {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "30d",
  });
}

export function verifyToken(token: string): User | null {
  try {
    return jwt.verify(token, JWT_SECRET) as User;
  } catch {
    return null;
  }
}

export async function setSessionCookie(user: User) {
  const token = signToken(user);
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });
}

export async function getSession(): Promise<User | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getSubscription(userId: number) {
  const result = await pool.query(
    `SELECT *, 
       CASE WHEN tools_access_end > NOW() THEN TRUE ELSE FALSE END as tools_active
     FROM subscriptions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1`,
    [userId]
  );
  return result.rows[0] || null;
}

export async function hasToolsAccess(userId: number): Promise<boolean> {
  const sub = await getSubscription(userId);
  return sub?.tools_active === true;
}

export async function hasCourseAccess(userId: number): Promise<boolean> {
  const sub = await getSubscription(userId);
  return sub?.course_access === true;
}

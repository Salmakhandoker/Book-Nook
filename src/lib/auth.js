import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

export async function getUser() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  const decoded = verifyToken(token);

  if (!decoded) return null;

  return decoded;
}
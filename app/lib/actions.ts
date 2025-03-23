'use server'

import { Item } from './definitions'
import { auth } from '@/auth';

export async function buyItem(item: Item): Promise<any> {
  const session = await auth();
  if (!session) {
    return { error: 'Faça login para comprar!' };
  }
  const accessToken = session.user.accessToken;

  const response = await fetch('http://localhost:5000/api/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken: accessToken, item: item })
  });
  const data = await response.json();

  return data;
}
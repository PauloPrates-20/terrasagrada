'use server'

import { Item } from './definitions'
import { auth } from '@/auth';

export async function buyItem(item: Item): Promise<string> {
  const session = await auth();
  if (!session) {
    return 'Faça login para comprar!';
  }
  const accessToken = session.user.accessToken;

  fetch('http://localhost:5000/api/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken: accessToken, item: item })
  });
  return 'Compra enviada! Verifique o andamento no Discord!';
}
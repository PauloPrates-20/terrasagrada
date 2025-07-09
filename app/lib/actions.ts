'use server'

import { Item } from './definitions'
import { auth } from '@/auth';

export async function getId() {
  const session = await auth();

  if (!session?.user) return { error: 'Usuário não autenticado.' };

  return session.user.id as string;
}

export async function buyItem(item: Item, characterKey: string): Promise<any> {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Faça login para comprar!' };
  }

  const accessToken = session.user.accessToken;
  try {
    const response = await fetch(`${process.env.API_URL}/buy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ accessToken, item, characterKey })
    });
    const data = await response.json();
  
    return data;
  } catch (e: any) {
    return { error: `Erro de servidor: ${e.message}` };
  }
}
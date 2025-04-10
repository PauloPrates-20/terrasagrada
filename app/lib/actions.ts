'use server'

import { CharacterList, Item } from './definitions'
import { auth } from '@/auth';
import { getCharacters } from './db';
import Swal from 'sweetalert2';

export async function buyItem(item: Item): Promise<any> {
  const session = await auth();
  if (!session?.user) {
    return { error: 'Faça login para comprar!' };
  }

  const characterList: CharacterList = await getCharacters(session.user.id!);

  if (Object.keys(characterList).length === 0) {
    return { error: 'É preciso ter um personagem para comprar' };
  }

  const options: { [key: string]: string } = {};

  for (const key in characterList) {
    options[key] = characterList[key].name;
  }

  const character = await Swal.fire({
    title: 'Selecionar personagem',
    input: 'select',
    inputOptions: {
      Personagens: {
        ...options
      }
    }
  });
  
  const accessToken = session.user.accessToken;

  const response = await fetch(`${process.env.DISCORD_API_URL}/buy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accessToken: accessToken, item: item })
  });
  const data = await response.json();

  return data;
}
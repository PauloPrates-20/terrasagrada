'use server'

import { Item } from './definitions'
import { getToken } from 'next-auth/jwt';
import { headers } from 'next/headers';

export async function buyItem(item: Item, charName: string): Promise<any> {
    const token = await getToken({
        req: { headers: Object.fromEntries(await headers()) } as any,
        secret: process.env.AUTH_SECRET!
    })

    if (!token) {
        return { error: 'Faça login para comprar!' };
    }

    const accessToken = token.accessToken as string;
    try {
        const response = await fetch(`${process.env.API_URL}/buy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken, item, charName })
        });
        const data = await response.json();

        return data;
    } catch (e: any) {
        console.error(e);
        return { error: 'Erro interno do servidor. Tente novamente' };
    }
}

export async function reforgeItem(item: Item, baseItem: string,  charName: string, isUpgrade: boolean): Promise<any> {
    const token = await getToken({
        req: { headers: Object.fromEntries(await headers()) } as any,
        secret: process.env.AUTH_SECRET!
    })

    if (!token) {
        return { error: 'Faça login para comprar!' };
    }

    const accessToken = token.accessToken as string;
    try {
        const response = await fetch(`${process.env.API_URL}/reforge`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accessToken, item, baseItem, charName, isUpgrade })
        });
        const data = await response.json();

        return data;
    } catch (e: any) {
        console.error(e);
        return { error: "Erro interno do servidor. Tente novamente." };
    }
}
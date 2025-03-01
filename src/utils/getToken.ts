// src/utils/getToken.ts
import { cookies } from 'next/headers';

export const getToken = async (): Promise<string> => {
    const cookieStore = await cookies(); // Usa await aquí
    return cookieStore.get("x-token")?.value || "";
};

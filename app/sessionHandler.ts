// sessionHandler.ts
import { Client, Account } from 'node-appwrite';
import { cookies } from 'next/headers';

export async function getSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const sessionCookie = cookies().get("appwrite-session");

  if (!sessionCookie || !sessionCookie.value) {
    throw new Error("No session found. User needs to be authenticated.");
  }

  client.setSession(sessionCookie.value);

  return new Account(client);
}

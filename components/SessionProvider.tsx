'use client'
import { Session } from "next-auth"
import { SessionProvider as NextAuthProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
  session: Session | null;
}

export function SessionProvider({ children, session }: Props) {
  return (
    <NextAuthProvider session={session}>
      {children}
    </NextAuthProvider>
  );
}

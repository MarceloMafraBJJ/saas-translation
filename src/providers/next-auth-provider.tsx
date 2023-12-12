"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

const NextAuthProvider = ({ children }: SessionProviderProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;

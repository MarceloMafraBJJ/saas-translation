"use client";

import { firebaseAuth } from "@/lib/firebase";
import { signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

const syncFirebaseAuth = async (session: Session) => {
  if (session && session.firebaseToken) {
    try {
      await signInWithCustomToken(firebaseAuth, session.firebaseToken);
    } catch (error) {
      console.log("Error signing in with custom token: ", error);
    }
  } else {
    firebaseAuth.signOut();
  }
};

const FirebaseAuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    syncFirebaseAuth(session);
  }, [session]);

  return <>{children}</>;
};

export default FirebaseAuthProvider;

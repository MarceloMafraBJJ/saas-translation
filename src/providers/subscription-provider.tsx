"use client";

import { useSubscriptionStore } from "@/context/store";
import { subscriptionRef } from "@/lib/converters/subscription";
import { Subscription } from "@/types/subscription";
import { onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const { setSubscription } = useSubscriptionStore();

  useEffect(() => {
    if (!session) return;

    return onSnapshot(
      subscriptionRef(session?.user.id),
      (snapshot) => {
        if (snapshot.empty) {
          console.log("User has NO subscription");
          setSubscription(null);
        } else {
          console.log("User has subscription");

          const isActive = snapshot.docs.filter((doc) => {
            return doc.data().status == "active";
          });

          setSubscription(isActive[0].data() as Subscription);
        }
      },
      (error) => {
        console.log("Error getting document: ", error);
      },
    );
  }, [session, setSubscription]);

  return <>{children}</>;
};

export default SubscriptionProvider;

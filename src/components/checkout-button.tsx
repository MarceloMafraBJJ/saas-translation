"use client";

import { db } from "@/lib/firebase";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LoadingSpinner from "./loading-spinner";
import { useSubscriptionStore } from "@/context/store";
import ManageAccountButton from "./manage-account-button";

const CheckoutButton = () => {
  const { subscription } = useSubscriptionStore();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const isLoadingSubscription = subscription === undefined;
  const isSubscribed =
    subscription?.status === "active" && subscription.role === "pro";

  const handleCheckoutSession = async () => {
    if (!session) return;
    setLoading(true);

    const docRef = await addDoc(
      collection(db, "customers", session.user.id, "checkout_sessions"),
      {
        price: "price_1OIGJhKcCF3ExaujeZQWdoqF",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      },
    );

    return onSnapshot(docRef, (snap) => {
      const data = snap.data();
      const url = data?.url;
      const error = data?.error;

      if (error) {
        alert(`An error occurred: ${error.message}`);
        setLoading(false);
      }

      if (url) {
        window.location.assign(url);
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex flex-col space-y-2">
      {isSubscribed && (
        <>
          <hr className="mt-5" />
          <p className="pt-5 text-center text-xs text-indigo-600">
            You are a subscribed to PRO
          </p>
        </>
      )}

      <div className="mt-8 block cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-80">
        {isSubscribed ? (
          <ManageAccountButton />
        ) : isLoadingSubscription || loading ? (
          <LoadingSpinner />
        ) : (
          <button onClick={handleCheckoutSession} disabled={loading}>
            Sign Up
          </button>
        )}
      </div>
    </div>
  );
};

export default CheckoutButton;

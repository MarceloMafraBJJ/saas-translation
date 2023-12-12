"use client";

import { useSubscriptionStore } from "@/context/store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const UpgradeBanner = () => {
  const router = useRouter();
  const { subscription } = useSubscriptionStore();

  const isPro = subscription?.role === "pro";

  if (subscription === undefined || isPro) return;

  return (
    <Button
      onClick={() => router.push("/register")}
      className="z-50 w-full rounded-none bg-gradient-to-r from-[#7775D6] to-[#E935C1] px-5 py-2 text-center text-white transition-all hover:opacity-75 hover:shadow-md"
    >
      Upgrade to Pro to unlock all features!
    </Button>
  );
};

export default UpgradeBanner;

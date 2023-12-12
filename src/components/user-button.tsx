"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "./user-avatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/context/store";
import LoadingSpinner from "./loading-spinner";
import { StarIcon } from "lucide-react";
import ManageAccountButton from "./manage-account-button";

const UserButton = ({ session }: { session: Session | null }) => {
  const { subscription } = useSubscriptionStore();
  const { push } = useRouter();

  if (!session)
    return (
      <Button onClick={() => signIn("google")} variant={"outline"}>
        Sign In
      </Button>
    );

  const handleSignOut = () => {
    push("/");
    signOut();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar name={session.user?.name!} image={session.user?.image!} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {subscription === undefined && (
          <DropdownMenuItem>
            <LoadingSpinner />
          </DropdownMenuItem>
        )}

        {subscription?.role === "pro" && (
          <>
            <DropdownMenuLabel className="flex animate-pulse items-center justify-center space-x-1 text-xs text-[#E935C1]">
              <StarIcon fill="#E935C1" />
              <p>PRO</p>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <ManageAccountButton />
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={handleSignOut}>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

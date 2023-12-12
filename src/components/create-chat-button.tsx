"use client";

import { MessageSquarePlus } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSubscriptionStore } from "@/context/store";
import { useSession } from "next-auth/react";
import { useToast } from "./ui/use-toast";
import LoadingSpinner from "./loading-spinner";
import { v4 as uuidv4 } from "uuid";
import { getDocs, serverTimestamp, setDoc } from "firebase/firestore";
import {
  addChatRef,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/chat-members";
import { ToastAction } from "./ui/toast";

const CreateChatButton = ({ isLarge }: { isLarge?: boolean }) => {
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const { subscription } = useSubscriptionStore();
  const { data: session } = useSession();

  const createNewChat = async () => {
    if (!session?.user.id) return;
    setLoading(true);

    toast({
      title: "Creating new chat...",
      description: "Hold tight while we create our new chat...",
      duration: 3000,
    });

    const noOfChats = (
      await getDocs(chatMembersCollectionGroupRef(session.user.id))
    ).docs.map((doc) => doc.data()).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && noOfChats >= 3) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the limit of chats for the FREE plan. Upgrade to PRO to continue adding users to chats!",
        variant: "destructive",
        action: (
          <ToastAction altText="Upgrade" onClick={() => push("/register")}>
            Upgrade to PRO
          </ToastAction>
        ),
      });

      setLoading(false);
      return;
    }

    const chatId = uuidv4();

    await setDoc(addChatRef(chatId, session.user.id), {
      userId: session.user.id,
      email: session.user.email,
      timestamp: serverTimestamp(),
      isAdmin: true,
      chatId,
      image: session.user.image || "",
    })
      .then(() => {
        toast({
          title: "Success",
          description: "Your chat has been created!",
          className: "bg-green-600 text-white",
          duration: 2000,
        });

        push(`/chat/${chatId}`);
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Error",
          description: "There was an error creating your chat!",
          variant: "destructive",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLarge)
    return (
      <div>
        <Button variant={"default"} onClick={createNewChat}>
          {loading ? <LoadingSpinner /> : "Create a New Chat"}
        </Button>
      </div>
    );

  return (
    <Button onClick={createNewChat} variant={"ghost"}>
      <MessageSquarePlus />
    </Button>
  );
};

export default CreateChatButton;

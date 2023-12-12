"use client";

import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  ChatMembersProps,
  chatMembersCollectionGroupRef,
} from "@/lib/converters/chat-members";
import { useSession } from "next-auth/react";
import { MessageSquare } from "lucide-react";
import CreateChatButton from "./create-chat-button";
import ChatListRow from "./chat-list-row";

const ChatListRows = ({
  initialChats,
}: {
  initialChats: ChatMembersProps[];
}) => {
  const { data: session } = useSession();

  const [members, loading, error] = useCollectionData<ChatMembersProps>(
    session && chatMembersCollectionGroupRef(session?.user.id),
    { initialValue: initialChats },
  );

  if (members?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-2 pt-40">
        <MessageSquare className="h-10 w-10" />

        <h1 className="text-5xl font-extralight">Welcome!</h1>
        <h2 className="pb-10">
          Let's get you started by creating your first chat!
        </h2>
        <CreateChatButton isLarge />
      </div>
    );
  }

  return (
    <div>
      {members?.map((member) => (
        <ChatListRow key={member.chatId} chatId={member.chatId} />
      ))}
    </div>
  );
};

export default ChatListRows;

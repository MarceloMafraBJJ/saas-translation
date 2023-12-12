"use client";

import {
  MessageProps,
  limitedSortedMessagesRef,
} from "@/lib/converters/message";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Skeleton } from "./ui/skeleton";
import { useRouter } from "next/navigation";
import UserAvatar from "./user-avatar";
import { useSession } from "next-auth/react";
import { useLanguageStore } from "@/context/store";

const ChatListRow = ({ chatId }: { chatId: string }) => {
  const { push } = useRouter();

  const { data: session } = useSession();

  const { language } = useLanguageStore();

  const [messages, loading, error] = useCollectionData<MessageProps>(
    limitedSortedMessagesRef(chatId),
  );

  function prettyUUID(n = 4) {
    return chatId.substring(0, n);
  }

  const row = (message?: MessageProps) => (
    <div
      key={chatId}
      onClick={() => push(`/chat/${chatId}`)}
      className="flex cursor-pointer items-center space-x-2 p-5 hover:bg-gray-100 dark:hover:bg-slate-700"
    >
      <UserAvatar
        name={message?.user.name || session?.user.name}
        image={message?.user.image || session?.user.image}
      />

      <div className="flex-1">
        <p className="font-bold">
          {!message && "New Chat"}
          {message &&
            [message?.user.name || session?.user.name].toString().split(" ")[0]}
        </p>

        <p className="line-clamp-1 text-gray-400">
          {message?.translated?.[language] || "Get the conversation started..."}
        </p>
      </div>

      <div className="text-right text-xs text-gray-400">
        <p className="mb-auto">
          {message
            ? new Date(message.timestamp).toLocaleTimeString()
            : "No messages yet"}
        </p>

        <p>chat #{prettyUUID()}</p>
      </div>
    </div>
  );

  return (
    <div>
      {loading && (
        <div className="flex items-center space-x-2 p-5">
          <Skeleton className="h-12 w-12 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      )}

      {messages?.length === 0 && !loading && row()}

      {messages?.map((message) => row(message))}
    </div>
  );
};

export default ChatListRow;

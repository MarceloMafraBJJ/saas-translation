"use client";

import { useLanguageStore } from "@/context/store";
import { MessageProps, sortedMessagesRef } from "@/lib/converters/message";
import { MessageCircle } from "lucide-react";
import { Session } from "next-auth";
import { createRef, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./loading-spinner";
import UserAvatar from "./user-avatar";

interface ChatMessagesProps {
  chatId: string;
  session: Session | null;
  initialMessages: MessageProps[];
}

const ChatMessages = ({
  chatId,
  initialMessages,
  session,
}: ChatMessagesProps) => {
  const { language } = useLanguageStore();
  const messagesEndRef = createRef<HTMLDivElement>();

  const [messages, loading, error] = useCollectionData<MessageProps>(
    sortedMessagesRef(chatId),
    { initialValue: initialMessages },
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, messagesEndRef]);

  return (
    <div className="p-5">
      {!loading && messages?.length === 0 && (
        <div className="flex flex-col items-center justify-center space-y-2 rounded-xl bg-indigo-400 p-20 text-center font-extralight text-white">
          <MessageCircle className="h-10 w-10" />

          <h2>
            <span className="font-bold">Invite a friend</span> &
            <p className="font-bold">Send your first message in ANY language</p>
          </h2>

          <p>The IA will auto-detect & translate it all for you</p>
        </div>
      )}

      {messages?.map((message) => {
        const isSender = message.user.id === session?.user.id;

        return (
          <div key={message.id} className="my-2 flex items-end">
            <div
              className={`2 relative mx-2 line-clamp-1 flex w-fit flex-col space-y-2 rounded-lg p-4 ${
                isSender
                  ? "ml-auto rounded-br-none bg-violet-600 text-white"
                  : "rounded-bl-none bg-gray-100 dark:bg-slate-700 dark:text-gray-100"
              }`}
            >
              <p
                className={`line-clamp-1 text-xs font-extralight italic ${
                  isSender ? "text-right" : "text-left"
                }`}
              >
                {message.user.name.split(" ")[0]}
              </p>

              <div className="flex space-x-2">
                <p>{message.translated?.[language] || message.input}</p>

                {!message.translated && <LoadingSpinner />}
              </div>
            </div>

            <UserAvatar
              name={message.user.name}
              image={message.user.image}
              className={`${!isSender && "-order-1"}`}
            />
          </div>
        );
      })}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;

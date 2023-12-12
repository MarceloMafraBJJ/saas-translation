import AdminControls from "@/components/admin-controls";
import ChatInput from "@/components/chat-input";
import ChatMembersBadge from "@/components/chat-members-badge";
import ChatMessages from "@/components/chat-messages";
import { authConfig } from "@/lib/auth";
import { chatMembersRef } from "@/lib/converters/chat-members";
import { sortedMessagesRef } from "@/lib/converters/message";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface ChatProps {
  params: {
    chatId: string;
  };
}

export default async function ChatPage({ params: { chatId } }: ChatProps) {
  const session = await getServerSession(authConfig);

  const initialMessages = (await getDocs(sortedMessagesRef(chatId))).docs.map(
    (doc) => doc.data(),
  );

  const hasAccess = (await getDocs(chatMembersRef(chatId))).docs
    .map((doc) => doc.id)
    .includes(session?.user.id);

  if (!hasAccess) redirect("/chat?error=permission");

  return (
    <>
      <AdminControls chatId={chatId} />
      <ChatMembersBadge chatId={chatId} />

      <div className="flex-1">
        <ChatMessages
          chatId={chatId}
          session={session}
          initialMessages={initialMessages}
        />
      </div>

      <ChatInput chatId={chatId} />
    </>
  );
}

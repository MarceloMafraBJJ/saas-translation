import { authConfig } from "@/lib/auth";
import { chatMembersCollectionGroupRef } from "@/lib/converters/chat-members";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import ChatListRows from "./chat-list-rows";

const ChatList = async () => {
  const session = await getServerSession(authConfig);

  const chatsSnapshot = await getDocs(
    chatMembersCollectionGroupRef(session?.user.id),
  );

  const initialChats = chatsSnapshot.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }));

  return <ChatListRows initialChats={initialChats} />;
};

export default ChatList;

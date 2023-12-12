"use client";

import UseAdminId from "@/hooks/use-admin-id";
import {
  ChatMembersProps,
  chatMembersRef,
} from "@/lib/converters/chat-members";
import { useCollectionData } from "react-firebase-hooks/firestore";
import LoadingSpinner from "./loading-spinner";
import { Badge } from "./ui/badge";
import UserAvatar from "./user-avatar";

const ChatMembersBadge = ({ chatId }: { chatId: string }) => {
  const [members, loading, error] = useCollectionData<ChatMembersProps>(
    chatMembersRef(chatId),
  );

  const adminId = UseAdminId({ chatId });

  if (loading && !members) return <LoadingSpinner />;

  return (
    !loading && (
      <div className="m-5 rounded-xl border p-2">
        <div className="flex flex-wrap items-center justify-center gap-2 p-2 md:justify-start">
          {members?.map((member) => (
            <Badge
              variant="secondary"
              className="flex h-14 space-x-2 p-5 pl-2"
              key={member.email}
            >
              <div className="flex items-center space-x-2">
                <UserAvatar name={member.email} image={member.image} />
              </div>

              <div>
                <p>{member.email}</p>
                {member.userId === adminId && (
                  <p className="animate-pulse text-indigo-400">Admin</p>
                )}
              </div>
            </Badge>
          ))}
        </div>
      </div>
    )
  );
};

export default ChatMembersBadge;

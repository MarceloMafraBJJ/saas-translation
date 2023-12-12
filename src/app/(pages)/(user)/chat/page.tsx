import ChatList from "@/components/chat-list";
import ChatPermissionError from "@/components/chat-permission-error";

interface ChatProps {
  searchParams: {
    error: string;
  };
}

export default async function Chat({ searchParams: { error } }: ChatProps) {
  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}

      <ChatList />
    </div>
  );
}

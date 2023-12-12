import DeleteChatButton from "./delete-chat-button";
import InviteUser from "./invite-user";

const AdminControls = ({ chatId }: { chatId: string }) => {
  return (
    <div className="m-5 mb-0 flex justify-end space-x-2">
      <InviteUser chatId={chatId} />
      <DeleteChatButton chatId={chatId} />
    </div>
  );
};

export default AdminControls;

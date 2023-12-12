import DarkModeToggle from "./dark-mode-toggle";
import Logo from "./logo";
import UserButton from "./user-button";
import Link from "next/link";
import { MessagesSquare } from "lucide-react";
import CreateChatButton from "./create-chat-button";
import { authConfig } from "@/lib/auth";
import { getServerSession } from "next-auth";
import UpgradeBanner from "./upgrade-banner";
import LanguageSelect from "./language-select";

const Header = async () => {
  const session = await getServerSession(authConfig);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="mx-auto flex max-w-7xl flex-col items-center justify-center bg-white p-5 pl-2 dark:bg-gray-900 sm:flex-row">
        <Logo />

        <div className="flex flex-1 items-center justify-end space-x-4">
          <LanguageSelect />

          {session ? (
            <>
              <Link href={"/chat"} prefetch={false}>
                <MessagesSquare className="text-black dark:text-white" />
              </Link>

              <CreateChatButton />
            </>
          ) : (
            <Link href={"/pricing"}>Pricing</Link>
          )}

          <DarkModeToggle />
          <UserButton session={session} />
        </div>
      </nav>

      <UpgradeBanner />
    </header>
  );
};

export default Header;

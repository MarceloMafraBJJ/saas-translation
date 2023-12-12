"use client";

import {
  LanguagesSupported,
  LanguagesSupportedMap,
  useLanguageStore,
  useSubscriptionStore,
} from "@/context/store";
import { usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import LoadingSpinner from "./loading-spinner";
import Link from "next/link";

const LanguageSelect = () => {
  const pathname = usePathname();
  const isChatPage = pathname.includes("/chat");

  const { language, setLanguage, getLanguages, getNotSupportedLanguages } =
    useLanguageStore();

  const { subscription } = useSubscriptionStore();

  const isPro =
    subscription?.role === "pro" && subscription?.status === "active";

  return (
    isChatPage && (
      <div>
        <Select
          onValueChange={(value: LanguagesSupported) => setLanguage(value)}
        >
          <SelectTrigger className="w-[150px] text-black dark:text-white">
            <SelectValue placeholder={LanguagesSupportedMap[language]} />
          </SelectTrigger>

          <SelectContent>
            {subscription === undefined ? (
              <LoadingSpinner />
            ) : (
              <>
                {getLanguages(isPro).map((language) => (
                  <SelectItem key={language} value={language}>
                    {LanguagesSupportedMap[language]}
                  </SelectItem>
                ))}
                {getNotSupportedLanguages(isPro).map((language) => (
                  <Link href={"/register"} key={language} prefetch={false}>
                    <SelectItem
                      value={language}
                      disabled
                      className="my-1 bg-gray-300/50 py-2 text-gray-500 dark:text-white"
                    >
                      {LanguagesSupportedMap[language]} {"(PRO)"}
                    </SelectItem>
                  </Link>
                ))}
              </>
            )}
          </SelectContent>
        </Select>
      </div>
    )
  );
};

export default LanguageSelect;

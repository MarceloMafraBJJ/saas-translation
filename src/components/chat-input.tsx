"use client";

import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { limitedMessagesRef, messagesRef } from "@/lib/converters/message";
import { useSubscriptionStore } from "@/context/store";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { ToastAction } from "./ui/toast";

const formSchema = z.object({
  input: z.string().max(1000).min(1),
});

const ChatInput = ({ chatId }: { chatId: string }) => {
  const { data: session } = useSession();
  const { subscription } = useSubscriptionStore();
  const { toast } = useToast();
  const { push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  const onSubmit = async ({ input }: z.infer<typeof formSchema>) => {
    if (!session?.user || input.length === 0) return;

    const messages = (await getDocs(limitedMessagesRef(chatId))).docs.map(
      (doc) => doc.data(),
    ).length;

    const isPro =
      subscription?.role === "pro" && subscription.status === "active";

    if (!isPro && messages >= 20) {
      toast({
        title: "Free plan limit exceeded",
        description:
          "You've exceeded the FREE plan limit of 20 messages per chat. Upgrade to PRO for unlimited chat messages!",
        variant: "destructive",
        action: (
          <ToastAction altText="Upgrade" onClick={() => push("/register")}>
            Upgrade to PRO
          </ToastAction>
        ),
      });
    }

    const userToStore = {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image || "",
    };

    addDoc(messagesRef(chatId), {
      input,
      timestamp: serverTimestamp(),
      user: userToStore,
    });

    form.reset();
  };

  return (
    <div className="sticky bottom-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex max-w-4xl space-x-2 rounded-t-xl border bg-white p-2 dark:bg-slate-800"
        >
          <FormField
            control={form.control}
            name="input"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    className="border-none bg-transparent dark:placeholder:text-white/70"
                    placeholder="Enter message in ANY language"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-violet-600 text-white">
            Send
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;

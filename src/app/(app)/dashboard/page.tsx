"use client";
import MessageCard from "@/components/messageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/Schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import {
  Inbox,
  Loader2,
  MessageCircleMore,
  RefreshCcw,
  Trash2,
} from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function Page() {
  const [messages, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
    defaultValues: {
      acceptMessage: false,
    },
  });
  const { register, watch, setValue } = form;

  const acceptMessage = watch("acceptMessage");

  const ondelete = (messageId: string) => {
    setMessage(messages.filter((m) => m._id.toString() !== messageId));
  };

  const fetchAcceptMessage = useCallback(async () => {
    try {
      const res = await axios.get<ApiResponse>("/api/acceptMessage");
      console.log(res);

      setValue("acceptMessage", res.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "failed to fetch accepting messages",
      );
    }
  }, [setValue]);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<ApiResponse>("/api/getMessage");
      console.log(res.data);
      setMessage(res.data.messages || []);
    } catch (error) {
      toast.error("failed to fetch messages");
    }
  }, [setMessage, setIsLoading]);

  useEffect(() => {
    if (!session || !session.user) return;

    fetchAcceptMessage();
    fetchMessages();
  }, [fetchMessages, fetchAcceptMessage, setValue]);

  const handleSwitch = async () => {
    try {
      const res = await axios.post<ApiResponse>("/api/acceptMessage", {
        acceptMessage: !acceptMessage,
      });
      setValue("acceptMessage", !acceptMessage);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("failed to accept messages");
    }
  };
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f9f8]">
        <Loader2 className="w-5 h-5 animate-spin text-[#d4d4d8]" />
      </div>
    );
  }

  const { username } = session!.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;

  const profileUrl = `${baseUrl}/u/${username}`;

  const copyClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Link copied!");
  };

  if (!session || !session.user) {
    return <div>Please Login</div>;
  }

  return (
    <div className="min-h-screen bg-[#f9f9f8]">
      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 bg-[#18181b] rounded-lg flex items-center justify-center">
              <MessageCircleMore className="w-3.5 h-3.5 text-[#a3e635]" />
            </div>
            <span className="text-[13px] font-semibold text-[#18181b] tracking-tight">
              Feedback
            </span>
          </div>
          <h1 className="text-[26px] font-semibold text-[#18181b] tracking-tight mt-3">
            Dashboard
          </h1>
          <p className="text-[13px] text-[#a1a1aa] mt-0.5">
            Manage your anonymous messages
          </p>
        </div>

        {/* Profile link card */}
        <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 mb-4">
          <p className="text-[11px] font-medium text-[#a1a1aa] uppercase tracking-widest mb-2">
            Your link
          </p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-[#fafafa] border border-[#e4e4e7] rounded-lg px-3 h-9 flex items-center">
              <span className="text-[13px] text-[#71717a] truncate">
                {profileUrl}
              </span>
            </div>
            <Button
              onClick={copyClipboard}
              className="h-9 px-4 rounded-lg cursor-pointer border border-[#e4e4e7] bg-white hover:bg-[#fafafa] text-[13px] font-medium text-[#18181b] transition-colors"
            >
              Copy
            </Button>
          </div>
        </div>

        {/* Accept messages toggle */}
        <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 mb-4 flex items-center justify-between">
          <div>
            <p className="text-[14px] font-medium text-[#18181b]">
              Accept messages
            </p>
            <p className="text-[12px] text-[#a1a1aa] mt-0.5">
              {acceptMessage
                ? "People can send you anonymous messages"
                : "You won't receive new messages"}
            </p>
          </div>
          <div className="border border-red-500 p-2">
            <Switch checked={acceptMessage} onCheckedChange={handleSwitch} />
          </div>
        </div>

        {/* Messages */}
        <div className="bg-white border border-[#ebebeb] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#f4f4f5]">
            <div>
              <p className="text-[14px] font-medium text-[#18181b]">Messages</p>
              <p className="text-[12px] text-[#a1a1aa]">
                {messages.length} received
              </p>
            </div>
            <Button
              onClick={fetchMessages}
              disabled={isLoading}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#e4e4e7] bg-white hover:bg-[#fafafa] text-[12px] font-medium text-[#71717a] transition-colors disabled:opacity-50"
            >
              <RefreshCcw
                className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-5 h-5 animate-spin text-[#d4d4d8]" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center px-4">
              <Inbox className="w-8 h-8 text-[#d4d4d8] mb-3" />
              <p className="text-[13px] font-medium text-[#18181b]">
                No messages yet
              </p>
              <p className="text-[12px] text-[#a1a1aa] mt-1">
                Share your link to start receiving anonymous feedback
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#f4f4f5]">
              {messages.map((message) => (
                <MessageCard
                  key={message._id.toString()}
                  message={message}
                  onMessageDelete={ondelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;

"use client";
import MessageCard from "@/components/messageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/Schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Inbox, Loader2, MessageCircleMore, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function Page() {
  const [messages, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status } = useSession();

  const form = useForm({ resolver: zodResolver(acceptMessageSchema), defaultValues: { acceptMessage: false } });
  const { watch, setValue } = form;
  const acceptMessage = watch("acceptMessage");

  const ondelete = (messageId: string) => {
    setMessage(messages.filter((m) => m._id.toString() !== messageId));
  };

  const fetchAcceptMessage = useCallback(async () => {
    try {
      const res = await axios.get<ApiResponse>("/api/acceptMessage");
      setValue("acceptMessage", res.data.isAcceptingMessage ?? false);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message || "Failed to fetch status");
    }
  }, [setValue]);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get<ApiResponse>("/api/getMessage");
      setMessage(res.data.messages || []);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  }, [setMessage, setIsLoading]);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchAcceptMessage();
    fetchMessages();
  }, [fetchMessages, fetchAcceptMessage, setValue]);

  const handleSwitch = async () => {
    try {
      const res = await axios.post<ApiResponse>("/api/acceptMessage", { acceptMessage: !acceptMessage });
      setValue("acceptMessage", !acceptMessage);
      toast.success(res.data.message);
    } catch {
      toast.error("Failed to update");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#18181b]">
        <Loader2 className="w-5 h-5 animate-spin text-[#3f3f46]" />
      </div>
    );
  }

  if (!session || !session.user) return <div className="min-h-screen bg-[#18181b] text-white flex items-center justify-center">Please Login</div>;

  const { username } = session.user as User;
  const profileUrl = `${window.location.protocol}//${window.location.host}/u/${username}`;

  return (
    <div className="min-h-screen bg-[#18181b]">
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-[#27272a] border border-[#3f3f46] rounded-lg flex items-center justify-center">
            <MessageCircleMore className="w-3.5 h-3.5 text-[#a3e635]" />
          </div>
          <span className="text-[13px] font-medium text-[#71717a]">Feedback</span>
        </div>

        {/* Hero */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 bg-[#27272a] border border-[#3f3f46] rounded-full px-3 py-1 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
            <span className="text-[11px] text-[#71717a]">Live dashboard</span>
          </div>
          <h1 className="text-[28px] font-semibold text-white mb-1">
            Good morning, <span className="text-[#a3e635]">@{username}</span>
          </h1>
          <p className="text-[13px] text-[#71717a]">Your anonymous feedback page is live and collecting messages.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total messages", value: messages.length },
            { label: "This week", value: messages.filter(m => (new Date().getTime() - new Date(m.createdAt).getTime()) < 7 * 24 * 60 * 60 * 1000).length },
            { label: "Today", value: messages.filter(m => new Date(m.createdAt).toDateString() === new Date().toDateString()).length },
          ].map((s, i) => (
            <div key={i} className="bg-[#27272a] border border-[#3f3f46] rounded-2xl p-4">
              <p className="text-[11px] text-[#71717a] mb-1">{s.label}</p>
              <p className="text-[22px] font-medium text-white">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Link + Toggle row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#27272a] border border-[#3f3f46] rounded-2xl p-5">
            <p className="text-[11px] font-medium text-[#52525b] uppercase tracking-widest mb-3">Your link</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-[#18181b] border border-[#3f3f46] rounded-xl px-3 h-9 flex items-center min-w-0">
                <span className="text-[12px] text-[#71717a] truncate">{profileUrl}</span>
              </div>
              <button
                onClick={() => { navigator.clipboard.writeText(profileUrl); toast.success("Link copied!"); }}
                className="h-9 px-3 bg-[#3f3f46] hover:bg-[#52525b] text-[#d4d4d8] text-[12px] font-medium rounded-xl transition-colors cursor-pointer border-0 whitespace-nowrap"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="bg-[#27272a] border border-[#3f3f46] rounded-2xl p-5">
            <p className="text-[11px] font-medium text-[#52525b] uppercase tracking-widest mb-3">Accepting messages</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14px] font-medium text-white">{acceptMessage ? "Open" : "Paused"}</p>
                <p className="text-[12px] text-[#71717a] mt-0.5">
                  {acceptMessage ? "Receiving anonymously" : "Not accepting messages"}
                </p>
              </div>
              <Switch checked={acceptMessage} onCheckedChange={handleSwitch} />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="bg-[#27272a] border border-[#3f3f46] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[14px] font-medium text-white">Messages</p>
              <p className="text-[12px] text-[#71717a]">{messages.length} received</p>
            </div>
            <button
              onClick={fetchMessages}
              disabled={isLoading}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#3f3f46] bg-[#18181b] hover:bg-[#3f3f46] text-[12px] text-[#71717a] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCcw className={`w-3 h-3 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-5 h-5 animate-spin text-[#3f3f46]" />
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Inbox className="w-8 h-8 text-[#3f3f46] mb-3" />
              <p className="text-[13px] font-medium text-white">No messages yet</p>
              <p className="text-[12px] text-[#71717a] mt-1">Share your link to start receiving feedback</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
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
"use client";

import { Button } from "@/components/ui/button";
import { messageSchema } from "@/Schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw, Send, Sparkles } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function Page() {
  const { username } = useParams<{ username: string }>();
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isSuggestLoading, setIsSuggestLoading] = useState(false)

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const content = form.watch("content");

  const handleSendMessage = async (data: z.infer<typeof messageSchema>) => {
    try {
      const res = await axios.post<ApiResponse>(
        `/api/sendMessages/${username}`,
        {
          content: data.content,
        },
      );
      console.log(res);
      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "error sending message");
    }
  };


  const handleSuggestions = async () => {
    try {
      setIsSuggestLoading(true)
      const res = await axios.post<ApiResponse>("/api/suggestMessage")
      console.log("res:", res);
      console.log("data:", res.data);
      setSuggestions(res.data.messages as unknown as string[])
      toast.success(res.data.message)
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "error fetcing suggestions message");
    }
    finally{
      setIsSuggestLoading(false)
    }
  }

  useEffect(() =>  {
    handleSuggestions()
  }, [])

   return (
    <div className="min-h-screen bg-[#f9f9f8]">
      <div className="max-w-lg mx-auto px-4 py-10">

        <div className="mb-8 text-center">
          <div className="w-9 h-9 bg-[#18181b] rounded-xl flex items-center justify-center mx-auto mb-3">
            <Send className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-[22px] font-semibold text-[#18181b]">Send a message</h1>
          <p className="text-[13px] text-[#a1a1aa] mt-1">
            to <span className="font-medium text-[#18181b]">@{username}</span> — 100% anonymous
          </p>
        </div>

        <div className="bg-white border border-[#ebebeb] rounded-2xl p-5 mb-4">
          <form onSubmit={form.handleSubmit(handleSendMessage)}>
            <textarea
              {...form.register("content")}
              placeholder="Write your anonymous message..."
              rows={4}
              className="w-full resize-none border border-[#e4e4e7] rounded-xl p-3 text-[14px] text-[#18181b] placeholder:text-[#d4d4d8] outline-none focus:border-[#a1a1aa] transition-colors bg-transparent"
            />
            <div className="flex items-center justify-between mt-3">
              <span className={`text-[12px] ${content.length > 500 ? "text-red-400" : "text-[#d4d4d8]"}`}>
                {content.length} / 500
              </span>
              <Button
                type="submit"
                disabled={!content || content.length > 500 || form.formState.isSubmitting}
                className="h-9 px-4 bg-[#18181b] hover:bg-[#27272a] text-white rounded-lg text-[13px] cursor-pointer"
              >
                {form.formState.isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <><Send className="w-3.5 h-3.5 mr-1.5" /> Send</>
                )}
              </Button>
            </div>
          </form>
        </div>

        <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#a1a1aa]" />
              <span className="text-[13px] font-medium text-[#18181b]">Suggested messages</span>
            </div>
            <button
              onClick={handleSuggestions}
              disabled={isSuggestLoading}
              className="flex items-center gap-1.5 h-7 px-3 rounded-lg border border-[#e4e4e7] text-[12px] text-[#71717a] hover:bg-[#fafafa] transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCcw className={`w-3 h-3 ${isSuggestLoading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {isSuggestLoading ? (
            <div className="flex items-center gap-2 py-4">
              <Loader2 className="w-4 h-4 animate-spin text-[#d4d4d8]" />
              <span className="text-[13px] text-[#a1a1aa]">Generating suggestions...</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => form.setValue("content", s)}
                  className="text-left text-[13px] text-[#71717a] border border-[#e4e4e7] rounded-xl px-4 py-2.5 hover:bg-[#fafafa] hover:text-[#18181b] transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <p className="text-[12px] text-[#d4d4d8] text-center mt-4">
          Your identity is never revealed
        </p>
      </div>
    </div>
  );
}

export default Page;

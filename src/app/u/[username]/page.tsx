"use client";

import { Button } from "@/components/ui/button";
import { messageSchema } from "@/Schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

function Page() {
  const { username } = useParams<{ username: string }>();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

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

  return (
    <>
      <div>
        hllo
        <form onSubmit={form.handleSubmit(handleSendMessage)}>
          <input
            className="w-2xs border-2"
            type="text"
            {...form.register("content")}
          />
          <Button type="submit" className="cursor-pointer">
            Send
          </Button>
        </form>
      </div>
    </>
  );
}

export default Page;

"use client";
import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/Schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function Page() {
  const [messages, setMessage] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),
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
  }, [fetchMessages, fetchAcceptMessage, session, setValue]);

  return <div></div>;
}

export default Page;

"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Clock, Trash2, User, X } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { Message } from "@/model/User";

type MessageCardProp = {
    message: Message,
    onMessageDelete: (messageId: string) => void 
}

function MessageCard({ message, onMessageDelete }: MessageCardProp) {

  const handleDelete = async () => {
    try {
      const res = await axios.delete<ApiResponse>(`/api/deleteMessage/${message._id}`)
      toast.success(res.data.message)
      onMessageDelete(message._id.toString())
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message ?? "Something went wrong")
    }
  }

  return (
    <div className="bg-white border border-[#ebebeb] rounded-2xl p-5">
      <div className="flex items-start justify-between gap-3">
        
        <div className="flex items-start gap-3 flex-1">
          <div className="w-8 h-8 rounded-full bg-[#fafafa] border border-[#e4e4e7] flex items-center justify-center flex-shrink-0 mt-0.5">
            <User className="w-4 h-4 text-[#a1a1aa]" />
          </div>
          <div className="flex-1">
            <p className="text-[12px] text-[#a1a1aa] mb-1">Anonymous</p>
            <p className="text-[14px] text-[#18181b] leading-relaxed">{message.content}</p>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-7 h-7 rounded-lg border border-[#e4e4e7] bg-transparent hover:bg-[#fafafa] flex items-center justify-center flex-shrink-0 text-[#a1a1aa] hover:text-[#ef4444] transition-colors cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete message?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>

      <div className="mt-3 pt-3 border-t border-[#f4f4f5] flex items-center gap-1.5">
        <Clock className="w-3 h-3 text-gray-600" />
        <span className="text-[12px] text-gray-600">
          {new Date(message.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
export default MessageCard
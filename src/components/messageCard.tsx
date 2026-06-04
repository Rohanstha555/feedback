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
import { Clock, Trash2, User } from "lucide-react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { Message } from "@/model/User";

type MessageCardProp = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProp) {
  const handleDelete = async () => {
    try {
      const res = await axios.delete<ApiResponse>(`/api/deleteMessage/${message._id}`);
      toast.success(res.data.message);
      onMessageDelete(message._id.toString());
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(axiosError.response?.data.message ?? "Something went wrong");
    }
  };

  return (
    <div className="bg-[#18181b] border border-[#3f3f46] rounded-xl p-4">
      <div className="flex items-start justify-between gap-3">

        <div className="flex items-start gap-3 flex-1">
          <div className="w-7 h-7 rounded-full bg-[#27272a] border border-[#3f3f46] flex items-center justify-center flex-shrink-0 mt-0.5">
            <User className="w-3.5 h-3.5 text-[#71717a]" />
          </div>
          <div className="flex-1">
            <p className="text-[11px] text-[#52525b] mb-1">Anonymous</p>
            <p className="text-[13px] text-[#d4d4d8] leading-relaxed">{message.content}</p>
          </div>
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button className="w-7 h-7 rounded-lg border border-[#3f3f46] bg-transparent hover:bg-[#27272a] flex items-center justify-center flex-shrink-0 text-[#52525b] hover:text-[#ef4444] transition-colors cursor-pointer">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-[#27272a] border border-[#3f3f46]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete message?</AlertDialogTitle>
              <AlertDialogDescription className="text-[#71717a]">
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-[#18181b] border-[#3f3f46] text-[#d4d4d8] hover:bg-[#3f3f46] hover:text-white">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-[#ef4444] hover:bg-[#dc2626] text-white border-0"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>

      <div className="mt-3 pt-3 border-t border-[#3f3f46] flex items-center gap-1.5">
        <Clock className="w-3 h-3 text-[#52525b]" />
        <span className="text-[11px] text-[#52525b]">
          {new Date(message.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}

export default MessageCard;
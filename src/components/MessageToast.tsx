import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface MessageToastProps {
  title: string;
  text: string;
  type: "success" | "error";
  closeToast: () => void;
}

export function MessageToast({
  title,
  text,
  type,
  closeToast,
}: MessageToastProps) {
  return (
    <div
      className={cn(
        "flex flex-col text-white p-4 rounded-md",
        type === "success" && "bg-[#118222]",
        type === "error" && "bg-[#DC2625]"
      )}
    >
      <div className="flex justify-between ">
        <p className="font-bold text-lg">{title}</p>
        <button
          className="text-white w-8 h-8 flex items-center justify-center"
          onClick={closeToast}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
      <p>{text}</p>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStoragePublicUrl } from "@/hooks/use-supabase";
import { formatDate, formatTime } from "@/utils/format-date";
import { SquareUserIcon } from "lucide-react";

export function AttendanceImage({
  data,
  isTimeIn,
}: {
  data: any;
  isTimeIn: boolean;
}) {
  const path = isTimeIn ? data.image_in : data?.image_out;
  if (!path) return <></>;
  const date = isTimeIn ? data.time_in : data.time_out;
  const {
    data: { publicUrl },
  } = useStoragePublicUrl("attendance", path);
  console.log("🚀 ~ AttendanceImage ~ publicUrl:", publicUrl);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SquareUserIcon className="ml-4" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isTimeIn ? "Time-In" : "Time-Out"}</DialogTitle>
          <DialogDescription>
            {formatDate(date, "MMMM DD, YYYY")} |{" "}
            {formatTime(date, "hh:mm:ss A")}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <img src={publicUrl} className="w-full" />
        </div>
      </DialogContent>
    </Dialog>
  );
}

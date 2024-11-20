import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import AttendanceTable from "../employee-portal/AttendanceTable";
import { Clock10Icon } from "lucide-react";

export function AttendanceDialog({ data }: { data: any }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setOpen(true)}
        style={{ marginRight: 4 }}
      >
        <Clock10Icon /> Attendance
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[825px]">
          <DialogHeader>
            <DialogTitle>
              {data?.first_name} {data?.last_name}
            </DialogTitle>
          </DialogHeader>
          <AttendanceTable viewOnly={true} employeeId={data.id} />
        </DialogContent>
      </Dialog>
    </>
  );
}

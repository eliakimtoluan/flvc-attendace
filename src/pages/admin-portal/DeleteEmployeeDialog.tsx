import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useState } from "react";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { TrashIcon } from "lucide-react";

export function DeleteEmployeeDialog({
  data,
  onRefresh,
}: {
  data: any;
  onRefresh: () => void;
}) {
  console.log(data);
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.id);

    if (error?.message) {
      toast.error(`${error.message}`);
      return;
    }
    toast.success("Successfully Deleted!");
    setOpen(false);
    onRefresh();
  };

  return (
    <>
      <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
        <TrashIcon />
        Delete
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Employee</DialogTitle>
          </DialogHeader>
          Are you sure you want to delete this employee?
          <Button variant="destructive" onClick={() => onSubmit()}>
            Delete
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

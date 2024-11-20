import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import toast from "react-hot-toast";
import { Role } from "@/store/profile.store";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { DeleteIcon, TrashIcon } from "lucide-react";

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  position: z.string(),
  email: z.string().email().optional(),
});

export function DeleteEmployeeDialog({
  data,
  onRefresh,
}: {
  data: any;
  onRefresh: () => void;
}) {
  console.log(data);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      position: data.position,
    },
  });

  // 2. Define a submit handler.
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

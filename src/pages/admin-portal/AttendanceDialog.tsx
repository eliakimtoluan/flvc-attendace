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
import AttendanceTable from "../employee-portal/AttendanceTable";
import { Clock10Icon } from "lucide-react";

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  position: z.string(),
  email: z.string().email().optional(),
});

export function AttendanceDialog({ data }: { data: any }) {
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabaseAdmin
      .from("profiles")
      .update({
        first_name: values.first_name,
        last_name: values.last_name,
        position: values.position,
      })
      .eq("id", data.id);
    if (error?.message) {
      toast.error(`${error.message}`);
      return;
    }
    toast.success("Successfully Updated!");
    setOpen(false);
  };

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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import { useState } from "react";
import { supabaseAdmin } from "@/lib/supabaseClient";
import { FileSpreadsheetIcon, KeyIcon, SaveIcon } from "lucide-react";
import { ChangePasswordDialog } from "./ChangePasswordDialog";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  position: z.string().optional(),
  email: z.string().email().optional(),
});

export function EditEmployeeDialog({
  data,
  open,
  setOpen,
}: {
  data: any;
  open: boolean;
  setOpen: any;
}) {
  const [openPassword, setOpenPassword] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      position: data.position,
    },
  });

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
    setOpen(FileSpreadsheetIcon);
    toast.success("Successfully Updated!");
  };

  return (
    <>
      {openPassword && (
        <ChangePasswordDialog
          data={data}
          open={openPassword}
          setOpen={setOpenPassword}
          onSuccess={() => {
            setOpenPassword(false);
            setOpen(false);
          }}
        />
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Employee</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4 py-4">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Juan" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Dela Cruz" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position</FormLabel>
                      <FormControl>
                        <Input placeholder="Teacher" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  disabled
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="juandelacruz@email.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">
                  <SaveIcon /> Update
                </Button>
              </div>
            </form>
          </Form>
          <Separator />
          <Button variant="ghost" onClick={() => setOpenPassword(true)}>
            <KeyIcon /> Change Password
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}

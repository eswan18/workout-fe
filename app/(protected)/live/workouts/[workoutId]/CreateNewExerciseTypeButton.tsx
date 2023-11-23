import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const formSchema = z.object({
  name: z.string(),
  numberOfWeights: z.coerce.number().int().nonnegative(),
  notes: z.string().optional(),
});

export default function CreateNewExerciseTypeButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* This button has to be inline in this function (not a separate component) for the alert trigger to work */}
        <Button variant='secondary'>
          Add new exercise type
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row justify-center">
        <div className="sm:w-64">
          <DialogHeader>
            <DialogTitle>Start a new exercise</DialogTitle>
          </DialogHeader>
          <CreateNewExerciseTypeForm
            closeDialog={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CreateNewExerciseTypeForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    // todo
    setLoading(false);
    closeDialog();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-col gap-4 my-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Chest Flys" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfWeights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Weights</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Notes</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Start</Button>
            </>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}
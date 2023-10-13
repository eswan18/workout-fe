"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";
import { createWorkoutType } from "@/lib/resources/workoutTypes";
import { useToast } from "@/components/ui/use-toast";

export default function NewWorkoutTypeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const wktType = { name, notes };
    console.log("wktType");
    console.log(wktType);
    createWorkoutType(wktType).then((result) => {
      if (!result.success) {
        setLoading(false);
        throw result.error;
      }
      setLoading(false);
      router.push("/dashboard");
      toast({
        title: "Success!",
        description: "Workout type created!",
      })
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-2xl font-bold mb-3">Create New Workout Type</h1>
      <div className="flex flex-col mb-3">
        <label
          htmlFor="email"
          className="mb-1 text-gray-700 dark:text-gray-100 flex flex-col items-start gap-1"
        >
          <p>Workout type name</p>
          <input
            className="w-full dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            type="text"
            id="name"
            name="email"
            placeholder="Going super saiyan"
            value={name}
            onChange={onNameChange}
          />
        </label>
        <label
          htmlFor="notes"
          className="mb-1 text-gray-700 dark:text-gray-100 flex flex-col items-start gap-1"
        >
          <p>Notes</p>
          <textarea
            className="w-full dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
            id="notes"
            name="notes"
            placeholder="This is my favorite friday workout"
            value={notes}
            onChange={onNotesChange}
          />
        </label>
      </div>
      <div className="flex w-full justify-center font-bold">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            className="flex flex-row justify-center items-center
                        rounded-full text-white bg-gold
                        py-2 px-4 m-2 gap-2"
            type="submit"
          >
            <p>Create</p>
            <i className="text-lg fi fi-sr-arrow-circle-right inline-flex align-[-0.2rem]" />
          </button>
        )}
      </div>
    </form>
  );
}

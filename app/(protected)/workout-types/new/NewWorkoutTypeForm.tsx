"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/forms/Input";
import LoadingSpinner from "@/components/LoadingSpinner";
import { WorkoutType } from "@/lib/resources/apiTypes";

export default function NewWorkoutTypeForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const onNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    /* todo ... */
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">New Workout Type</h1>
      <label
        htmlFor="name"
        className="mb-3 text-gray-700 dark:text-gray-100 flex flex-col"
      >
        <p className="mb-1">Workout Type Name</p>
        <input
          className="dark:text-gray-900 rounded-md border border-gray-300"
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={onNameChange}
        />
      </label>
      <label
        htmlFor="notes"
        className="mb-3 text-gray-700 dark:text-gray-100 flex flex-col"
      >
        <p className="mb-1">Notes (optional)</p>
        <textarea
          className="dark:text-gray-900 rounded-md border border-gray-300"
          id="notes"
          name="notes"
          value={notes}
          onChange={onNotesChange}
        />
      </label>

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

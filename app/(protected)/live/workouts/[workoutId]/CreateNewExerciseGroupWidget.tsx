"use client";

export default function CreateNewExerciseGroupWidget({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="rounded-lg p-2 lg:p-4 mt-3 whitespace-nowrap flex justify-start">
      <button
        className="flex flex-row justify-center items-center text-gold
                   py-2 m-2 gap-2 text-lg"
        onClick={onClick}
      >
        <i className="fi fi-sr-square-plus inline-flex align-[-0.2rem] text-2xl" />
        <p>New exercise</p>
      </button>
    </div>
  );
}

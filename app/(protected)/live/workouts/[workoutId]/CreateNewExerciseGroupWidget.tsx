"use client";

export default function CreateNewExerciseGroupWidget({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="whitespace-nowrap flex justify-start">
      <button
        className="flex flex-row justify-center items-center text-gold
                  ml-2 mt-1 gap-2 text-lg"
        onClick={onClick}
      >
        <i className="fi fi-sr-square-plus inline-flex align-[-0.2rem] text-2xl" />
        <p>New exercise</p>
      </button>
    </div>
  );
}

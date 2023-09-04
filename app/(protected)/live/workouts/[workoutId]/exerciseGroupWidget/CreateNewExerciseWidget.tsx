"use client";

export default function CreateNewExerciseWidget({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <div className="m-1 flex flex-col justify-start items-center w-20 h-20 shrink-0">
      <div className="rounded-lg shadow-lg flex flex-col w-full h-full bg-white shrink-0 justify-center items-center">
        <button
          className="text-gold text-4xl"
          title="Record new set"
          onClick={onClick}
        >
          <i className="fi fi-rr-square-plus inline-flex align-[-0.5rem]" />
        </button>
      </div>
    </div>
  );
}

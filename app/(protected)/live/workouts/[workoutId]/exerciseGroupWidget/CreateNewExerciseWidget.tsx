'use client'

export default function CreateNewExerciseWidget({ onClick }: { onClick: () => void}) {
  return (
    <div className="py-1 m-1 flex flex-col justify-start items-center w-20 h-28 shrink-0">
      <div className="rounded-lg shadow-lg flex flex-col w-full h-20 bg-white shrink-0 justify-center items-center">
        <button className="text-gold text-4xl" title='Record new set' onClick={onClick}>
          <i className="fi fi-rr-square-plus inline-flex align-[-0.5rem]" />
        </button>
      </div>
    </div>
  )
}
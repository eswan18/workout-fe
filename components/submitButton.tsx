export default function SubmitButton(props: {
  className?: string,
  children: React.ReactNode,
}) {
  const defaultClasses = "px-4 py-2 text-white rounded-md border border-white";
  return (
    <button
      className={`${defaultClasses} ${props.className}`}
      type="submit"
    >
      {props.children}
    </button>
  )
}
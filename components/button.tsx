export default function Button(props: {
  children: React.ReactNode,
  onClick: () => void,
  color: string,
  type?: "submit" | undefined,
}) {
  return (
    <button
      className={`px-4 py-2 text-white rounded-md ${props.color}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  )
}

Button.defaultProps = {
  type: undefined,
  onClick: () => {},
  color: "bg-red-400",
}
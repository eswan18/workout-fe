interface FormProps {
  title: string;
  action: (data: FormData) => any;
  className?: string;
  children: React.ReactNode;
}

export default function Form({ title, action, className, children }: FormProps) {
  return (
    <form
        action={action}
        className={`flex flex-col ${className}`}
    >
      <h2 className="text-2xl font-bold my-2">{title}</h2>
      { children }
    </form>
  )
}
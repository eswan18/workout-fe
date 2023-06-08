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
        className={`flex flex-col text-base p-2 md:p-4 rounded-md border-2 border-gray-700 dark:border-gray-100 shadow-md shadow-neutral-400 dark:shadow-neutral-200 ${className}`}
    >
      <h2 className="text-2xl font-bold py-3 mt-2">{title}</h2>
      { children }
    </form>
  )
}
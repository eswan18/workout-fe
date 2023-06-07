interface EmailPasswordFormProps {
  title: string;
  action: (data: FormData) => any,
  children: React.ReactNode;
}

export default function Form({ title, action, children }: EmailPasswordFormProps) {
  return (
    <div className="flex flex-col text-base p-2 rounded-md border-2 border-gray-700 dark:border-gray-100 shadow-md shadow-neutral-400 dark:shadow-neutral-200">
      <h2 className="text-2xl font-bold py-3 mt-2">{title}</h2>
      <form action={action} className="flex flex-col gap-3 text-black">
        { children }
      </form>
    </div>
  )
}
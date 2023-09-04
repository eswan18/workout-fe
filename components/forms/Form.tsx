interface FormProps {
  title?: string;
  action?: (data: FormData) => any;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  children: React.ReactNode;
}

export default function Form({
  title,
  action,
  onSubmit,
  className,
  children,
}: FormProps) {
  return (
    <div className="flex flex-col items-center">
      <form
        action={action}
        onSubmit={onSubmit}
        className={`flex flex-col ${className}`}
      >
        {title && <h2 className="text-2xl font-bold my-2">{title}</h2>}
        {children}
      </form>
    </div>
  );
}

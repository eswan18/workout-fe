type InputProps = {
  htmlFor: string;
  type: string;
  step?: string;
  id: string;
  name: string;
  label: string;
  placeholder: string;
  onValueUpdate?: (value: any) => void;
  required?: boolean;
  className?: string;
}

export default function Input({htmlFor, type, step, id, name, label, placeholder, onValueUpdate, required = false}: InputProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueUpdate && onValueUpdate(e.target.value);
  }
  return (
    <div className='flex flex-col mb-3'>
      <label htmlFor={htmlFor} className='mb-1 text-gray-700 dark:text-gray-100'>{label}</label>
      <input
        type={type}
        step={step}
        id={id}
        name={name}
        placeholder={placeholder}
        className='dark:text-gray-900 rounded-md border border-gray-300'
        required={required}
        onChange={onChange}
      />
    </div>
  );
}
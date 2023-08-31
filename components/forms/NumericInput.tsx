type NumericInputProps = {
  htmlFor: string;
  type: string;
  step?: string;
  id: string;
  name: string;
  label: string;
  value?: number;
  placeholder: string;
  onValueUpdate?: (value: number) => void;
  required?: boolean;
  className?: string;
}

export default function NumericInput({htmlFor, step, id, name, label, value, placeholder, onValueUpdate, required = false}: NumericInputProps) {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    onValueUpdate && onValueUpdate(value);
  }
  return (
    <div className='flex flex-col mb-3'>
      <label htmlFor={htmlFor} className='mb-1 text-gray-700 dark:text-gray-100'>{label}</label>
      <input
        type='number'
        step={step}
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        className='dark:text-gray-900 rounded-md border border-gray-300'
        required={required}
        onChange={onChange}
      />
    </div>
  );
}
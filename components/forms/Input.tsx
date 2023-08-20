export default function Input({htmlFor, type, id, name, label, placeholder, required = false}: {htmlFor: string, type: string, id: string, name: string, label: string, placeholder: string, required?: boolean, className?: string}) {
  return (
    <div className='flex flex-col mb-3'>
      <label htmlFor={htmlFor} className='mb-1 text-gray-700 dark:text-gray-100'>{label}</label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className='dark:text-gray-900 rounded-md border border-gray-300'
        required={required}
      />
    </div>
  );
}
'use client'

// I was unable to get this working as a server component; I got errors about being unable to destruction "children" from the props.

type ClientModalProps = {
  children: any;
}

export default function ClientModal({ children }: ClientModalProps) {
  return (
    <div className="fixed z-10 inset-0 min-h-screen min-w-full p-12 lg:p-24 lg:px-32 bg-gray-800 bg-opacity-60">
      <div className="w-full max-w-2xl mx-auto h-full p-16 lg:p-18 border border-gray-900 bg-white dark:bg-gray-900 rounded-md lg:rounded-lg">
        { children }
      </div>
    </div>
  )
}
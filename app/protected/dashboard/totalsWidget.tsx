// A component for displaying a single number in a box

import React from 'react'

interface TotalsWidgetProps {
  title: string;
  value: number;
  color: string;
}

export default function TotalsWidget({ title, value, color }: TotalsWidgetProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 dark:from-inherit lg:static lg:rounded-xl lg:py-10 lg:px-14 bg-gradient-to-r from-blue-300 to-green-300 backdrop-blur-md">
      <h2 className="text-2xl font-bold p-2">{title}</h2>
      <div className={`flex items-center justify-center w-24 h-24 rounded-full ${color}`}>
        <span className="text-4xl font-bold">{value}</span>
      </div>
    </div>
  )
}
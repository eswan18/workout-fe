import './globals.css'
import { Inter } from 'next/font/google'
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout(props: {
  children: React.ReactNode,
  login: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <div className="flex flex-col text-center bg-red-400 text-black border-gray-100">
            <p>Ethan&apos;s Workout App</p>
          </div>
          { props.children }
      </body>
    </html>
  )
}

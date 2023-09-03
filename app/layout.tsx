import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import '@flaticon/flaticon-uicons/css/all/all.css'
import React from 'react';
import NavBar from '@/components/navBar/navBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flex of Gold',
  description: 'A bespoke workout-tracking app',
}

export default function RootLayout(props: {
  children: React.ReactNode,
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <NavBar />
          <div className='content-container-flexbox w-full flex flex-row justify-center dark:bg-gray-700'>
          <div className='spacer flex-grow w-0'></div>
          <div className="content-container flex-initial w-[48rem] h-full">
            {props.children}
          </div>
          <div className='spacer flex-grow w-0'></div>
        </div>
        <Analytics />
      </body>
    </html>
  )
}

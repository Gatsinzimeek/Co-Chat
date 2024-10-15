
import type { Metadata } from 'next'

import ToasterContext from './context/ToasterContext'
import './globals.css'

import AuthContext from './context/AuthContext'


export const metadata: Metadata = {
  title: 'Co-worker',
  description: 'co-worker Chating App',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return ( 
    <html lang="en">
      <body>
        <AuthContext>
        <ToasterContext />
        {children}
        </AuthContext>
      </body>
    </html>
  )
}

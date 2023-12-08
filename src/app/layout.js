import { Kanit } from 'next/font/google'
import './globals.css'

const inter = Kanit({ subsets: ['latin'], weight: ['200'] })

export const metadata = {
  title: 'Katharsis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

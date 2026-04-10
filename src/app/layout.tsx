import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Jaime Pineda - Full Stack Web Developer',
  description:
    'Full Stack Web Developer focused on JavaScript and TypeScript, ' +
    'continuously improving my skills in both frontend and backend development to build smooth and efficient web applications. ' +
    'Eager to learn and solve problems, I perform exceptionally well in collaborative environments to deliver high-quality solutions.',
}

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Readonly<Props>) {
  return (
    <html lang="en" className={`${jetBrainsMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  )
}

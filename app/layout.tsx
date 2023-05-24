import './globals.css'
import SideBar from '@/components/SideBar'

export const metadata = {
  title: 'NoteHub',
  description: 'Note taking app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex'>
        <SideBar />
        {children}
      </body>
    </html>
  )
}

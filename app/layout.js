import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Foooter from '@/components/Foooter'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'getprompt',
  description: 'discover and share AI prompts... ',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <Navbar />
      {children}
      <Foooter />
      <ToastContainer />
      </body>
    </html>
  )
}

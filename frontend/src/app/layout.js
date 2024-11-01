import localFont from "next/font/local";
import Link from 'next/link'
import "./globals.css";

const geistSans = localFont({
  src: "./assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "EC",
  description: "Create by Group 8",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen h-screen w-screen`}
      >
        <div className="w-screen h-10 px-5 mb-5">
          <div className="w-full flex flex-row h-full">
            <div className="w-2/5 h-full flex flex-row items-center gap-1 self-center">
              <div className="w-1/4 text-center group h-full !text-black relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 text-2xl">
                <Link href='/' className="w-full h-full block">Home</Link>
              </div>
              <div className="w-1/4 text-center group h-full !text-black relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 text-2xl">
                <Link href='/login' className="w-full h-full block">Login</Link>
              </div>
              <div className="w-1/4 text-center group h-full !text-black relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 text-2xl">
                <Link href='/register' className="w-full h-full block">Register</Link>
              </div>
            </div>
            
          </div>
        </div>
        <div className="w-screen min-h-[calc(100vh-100px)] h-auto">{children}</div>
        <div className="w-screen h-10">Footer</div>
      </body>
    </html>
  );
}

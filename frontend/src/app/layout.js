import Link from 'next/link';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import {Image} from 'next/image'
import 'react-toastify/dist/ReactToastify.css';
import { CartProvider } from './utils/Context';
import CartBtn from './utils/components/CartBtn';
import UserBtn from './utils/components/UserBtn';
import { Providers } from './providers';
import logo from "./assets/img/logo.png"

export const metadata = {
  title: '8GROUP',
  description: 'Create by Group 8',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen min-h-screen flex flex-col">
          <CartProvider>
        <Providers>
            <div className="w-full lg:min-h-16 min-h-48 h-48 lg:h-16 px-5 lg:fixed top-0 left-0 lg:z-50 bg-white shadow-md">
              <div className="w-full grid h-full md:grid-rows-3 md:grid-cols-1 lg:grid-cols-3 lg:grid-rows-1">
                <Link
                  href="/"
                  className="w-fit h-16 block !text-black font-semibold text-3xl lg:place-self-start place-self-center"
                >
                  <Image src={ logo} href="logo" width={40} height={40} />
                </Link>
                <div className="w-full h-full flex flex-row gap-1">
                  <div className="w-1/3 text-center group h-full !text-black relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-500 after:transition-all after:duration-500 transition-all duration-500 text-2xl">
                    <Link href="/" className="w-full h-full block content-center">
                      Home
                    </Link>
                  </div>
                  <div className="w-1/3 text-center group h-full !text-black relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-500 after:transition-all after:duration-500 transition-all duration-500 text-2xl">
                    <Link
                      href="/shop"
                      className="w-full h-full block content-center"
                    >
                      Shop
                    </Link>
                  </div>
                  <div className="w-1/3 text-center group h-full !text-black relative font-semibold after:absolute after:h-0 after:w-0 after:bg-sky-800 after:left-1/2 overflow-hidden after:bottom-0 after:hover:h-1 after:hover:w-1 after:translate-x-full after:hover:scale-x-[300] after:hover:transition-all after:hover:duration-500 after:transition-all after:duration-500 transition-all duration-500 text-2xl">
                    <Link
                      href="/about"
                      className="w-full h-full block content-center"
                    >
                      About
                    </Link>
                  </div>
                </div>
                <div className="w-1/2 h-full flex flex-grow justify-between items-center lg:place-self-end place-self-center">
                  <UserBtn />
                  <CartBtn/>
                </div>
              </div>
            </div>
            <div className="w-full flex-grow pt-14 bg-slate-100">
                {children}
            </div>
            <div className="h-auto bg-sky-800 grid md:grid-rows-2 md:grid-cols-1 lg:grid-cols-2 lg:grid-rows-1 place-items-center py-3">
              <div className="flex flex-col">
                <div className="flex flex-row gap-5">
                  <div className="text-lg font-medium text-slate-300">Address:</div>
                  <div className="text-lg font-medium text-white">Đông Hoà, Thành Phố Thủ Đức, Bình Dương, Vietnam</div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="text-lg font-medium text-slate-300">Phone:</div>
                  <div className="text-lg font-medium text-white">0123456789</div>
                </div>
                <div className="flex flex-row gap-5">
                  <div className="text-lg font-medium text-slate-300">Email:</div>
                  <div className="text-lg font-medium text-white">fakemail@gmail.com</div>
                </div>
              </div>
              <div className="w-full h-full flex justify-center items-center">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d979.5241858212606!2d106.8049488!3d10.8802461!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d9d593f6d039%3A0x2a6b2fed68835b3a!2zVG_DoCBCSy5CMyAtIMSQ4bqhaSBo4buNYyBCw6FjaCBLaG9hIFRQLiBI4buTIENow60gTWluaCBjxqEgc-G7nyAy!5e0!3m2!1sen!2s!4v1733497461186!5m2!1sen!2s"
                  width="400"
                  height="200"
                  referrerPolicy="no-referrer-when-downgrade"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
        </Providers>
          </CartProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

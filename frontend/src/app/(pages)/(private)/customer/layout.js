import Link from 'next/link';

export const metadata = {
  title: "Customer",
  description: "Customer",
};

export default function CustomerLayout({ children }) {
  return (
      <div className="h-full w-full grid grid-cols-6 grid-rows-1 gap-4 my-4">
        <div className="h-full w-full flex flex-col p-5 bg-white rounded-e-lg">
          <Link href="/customer" className="w-full h-12 pl-5 block !text-black font-semibold text-xl bg-transparent z-10 relative after:-z-20 after:absolute after:h-full after:w-1 after:bg-sky-transparent after:hover:bg-sky-600 after:text-white after:left-0 overflow-hidden after:bottom-5 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 hover:!text-white content-center">Profile</Link>
          <Link href="/customer/order-history" className="w-full h-12 pl-5 block !text-black font-semibold text-xl bg-transparent z-10 relative after:-z-20 after:absolute after:h-full after:w-1 after:bg-sky-transparent after:hover:bg-sky-600 after:text-white after:left-0 overflow-hidden after:bottom-5 after:translate-y-full after:rounded-md after:hover:scale-[300] after:hover:transition-all after:hover:duration-700 after:transition-all after:duration-700 transition-all duration-700 hover:!text-white content-center">Order</Link>
        </div>
        <div className="col-span-5 bg-white p-5 rounded-s-lg">{children}</div>
      </div>
  );
}
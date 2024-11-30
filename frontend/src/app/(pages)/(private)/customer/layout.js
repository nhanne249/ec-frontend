import Link from 'next/link';

export const metadata = {
  title: "Customer",
  description: "Customer",
};

export default function CustomerLayout({ children }) {
  return (
      <div className="h-full w-full grid grid-cols-6 grid-rows-1 gap-4 my-4">
        <div className="h-full w-full flex flex-col p-5 bg-white rounded-e-lg">
          <Link href="/customer" className="w-full h-20 block !text-black font-semibold text-xl">Profile</Link>
          <Link href="/customer/order-history" className="w-full h-20 block !text-black font-semibold text-xl">Order</Link>
        </div>
        <div className="col-span-5 bg-white p-5 rounded-s-lg">{children}</div>
      </div>
  );
}
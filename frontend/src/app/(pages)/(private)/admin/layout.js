import Link from 'next/link';

export const metadata = {
  title: "Admin",
  description: "Admin",
};

export default function AdminLayout({ children }) {
  return (
      <div className="h-full w-full grid grid-cols-6 grid-rows-1 gap-4 my-4">
        <div className="h-full w-full flex flex-col p-5 bg-white rounded-e-lg">
          <Link href="/admin" className="w-full h-20 block !text-black font-semibold text-xl">Dashboard</Link>
          <Link href="/admin/customers-management" className="w-full h-20 block !text-black font-semibold text-xl">Customers</Link>
          <Link href="/admin/orders-management" className="w-full h-20 block !text-black font-semibold text-xl">Orders</Link>
          <Link href="/admin/products-management" className="w-full h-20 block !text-black font-semibold text-xl">Products</Link>
          <Link href="/admin/voucher-management" className="w-full h-20 block !text-black font-semibold text-xl">Voucher</Link>
        </div>
        <div className="col-span-5 bg-white p-5 rounded-s-lg">{children}</div>
      </div>
  );
}
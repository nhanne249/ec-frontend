export const metadata = {
  title: "Shop",
  description: "Shop",
};

export default function ShopLayout({ children }) {
  return (
      <div className="h-full w-full bg-white pt-5">
        {children}
      </div>
  );
}
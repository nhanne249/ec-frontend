export const metadata = {
  title: "Contact",
  description: "Contact",
};

export default function ContactLayout({ children }) {
  return (
      <div className="h-full w-full bg-white">
        {children}
      </div>
  );
}
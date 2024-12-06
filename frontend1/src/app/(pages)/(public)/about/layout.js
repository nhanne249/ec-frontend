export const metadata = {
  title: "About",
  description: "About",
};

export default function AboutLayout({ children }) {
  return (
      <div className="h-full w-full bg-white">
        {children}
      </div>
  );
}
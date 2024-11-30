export const metadata = {
  title: "EC",
  description: "Create by Group 8",
};

export default function Product({ children }) {
  return (
      <div className="h-full w-full bg-white pt-5">
        {children}
      </div>
  );
}
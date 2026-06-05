export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-md rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 shadow-xl p-8">
      <h1 className="text-3xl font-light tracking-tight">{title}</h1>
      <p className="text-sm text-gray-500 mt-2 mb-6">{subtitle}</p>

      {children}
    </div>
  );
}
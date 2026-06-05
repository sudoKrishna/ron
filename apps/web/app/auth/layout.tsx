export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#f6f8fc] text-gray-900 relative overflow-hidden">
      
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-200/40 blur-3xl rounded-full" />
      <div className="absolute bottom-[-120px] right-[-120px] w-[340px] h-[340px] bg-purple-200/30 blur-3xl rounded-full" />

      {children}
    </div>
  );
}
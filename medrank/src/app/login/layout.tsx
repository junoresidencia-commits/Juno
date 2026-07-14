export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-[100dvh] flex-1 flex-col bg-gradient-to-b from-emerald-50 via-slate-50 to-slate-100">
      {children}
    </div>
  );
}

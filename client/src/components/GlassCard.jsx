export default function GlassCard({ children, className }) {
  return (
    <div
      className={`flex items-center justify-center bg-white/40 rounded-2xl backdrop-blur-sm border-white/40 border-2  min-w-fit ${className}`}
    >
      {children}
    </div>
  );
}

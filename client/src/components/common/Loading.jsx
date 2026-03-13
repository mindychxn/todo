export default function Loading({ size = 'md', text = '' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`relative ${sizes[size]}`}>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-babyPink border-r-babyPurple border-b-babyBlue animate-spin" />
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-babyPink via-babyPurple to-babyBlue animate-pulse opacity-60" />
      </div>
      {text && <div className="text-gray-400 text-sm">{text}</div>}
    </div>
  );
}

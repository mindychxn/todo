import logoImg from '../../assets/checklist.png';

export default function Logo({ 
  size = 'md', 
  showText = true, 
  className = '' 
}) {
  const sizes = {
    sm: { img: 'w-[28px] h-[24px]', text: 'text-lg' },
    md: { img: 'w-[40px] h-[35px]', text: 'text-2xl' },
    lg: { img: 'w-[52px] h-[45px]', text: 'text-4xl' },
  };

  const { img, text } = sizes[size] || sizes.md;

  return (
    <div className={`flex gap-2 items-center font-bold ${className}`}>
      <img src={logoImg} className={`${img} flex-shrink-0`} alt="Taskify logo" />
      {showText && <span className={`${text} whitespace-nowrap`}>Taskify.</span>}
    </div>
  );
}

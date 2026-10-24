import { cn } from "@/utills";

type Props = { 
  className?: string; 
  size?: 'sm' | 'md' | 'lg' 
}

const dotSizeClasses = {
  sm: 'w-1 h-1',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
};

export function LoadingDots({ className, size = 'md' }: Props) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn('animate-bounce rounded-full bg-infinity-blue', dotSizeClasses[size])}
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s',
          }}
        />
      ))}
    </div>
  );
}

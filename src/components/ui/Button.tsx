import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center font-medium transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-primary-950 text-white hover:bg-primary-800 focus:ring-primary-950",
      secondary: "bg-white text-primary-950 border border-primary-200 hover:bg-primary-50 focus:ring-primary-950",
      gold: "bg-gold-500 text-primary-950 hover:bg-gold-400 focus:ring-gold-500",
      outline: "bg-transparent text-primary-950 border border-primary-200 hover:bg-primary-50 focus:ring-primary-950",
      ghost: "bg-transparent text-primary-950 hover:bg-primary-50 focus:ring-primary-950",
    };
    
    const sizes = {
      sm: "px-3 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          isLoading && "relative text-transparent",
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
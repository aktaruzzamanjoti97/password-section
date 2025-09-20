import { cn } from '@/lib/utils/cn';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	loading?: boolean;
	fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'md',
	loading = false,
	fullWidth = false,
	className,
	disabled,
	...props
}) => {
	const variants = {
		primary:
			'px-6 py-3 bg-[#2563eb] text-white rounded-lg font-medium transition-all duration-200 hover:bg-[#1d4ed8] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed',
		secondary: 'bg-gray-600 text-white hover:bg-gray-700',
		outline: 'border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#eff6ff]',
		ghost: 'text-gray-600 hover:bg-gray-100',
	};

	const sizes = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg',
	};

	return (
		<button
			className={cn(
				variants[variant],
				sizes[size],
				fullWidth && 'w-full',
				'relative transition-all duration-200 rounded-lg font-medium',
				'focus:outline-none focus:ring-2 focus:ring-offset-2',
				loading && 'cursor-wait',
				disabled && 'opacity-50 cursor-not-allowed',
				className
			)}
			disabled={disabled || loading}
			{...props}>
			{loading && (
				<span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
					<svg
						className='animate-spin h-5 w-5'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'>
						<circle
							className='opacity-25'
							cx='12'
							cy='12'
							r='10'
							stroke='currentColor'
							strokeWidth='4'
						/>
						<path
							className='opacity-75'
							fill='currentColor'
							d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
						/>
					</svg>
				</span>
			)}
			<span className={loading ? 'invisible' : ''}>{children}</span>
		</button>
	);
};

export default Button;

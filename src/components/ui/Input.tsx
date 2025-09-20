import { cn } from '@/lib/utils/cn';
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	success?: boolean;
	helperText?: string;
	rightElement?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ className, label, error, success, helperText, rightElement, ...props },
		ref
	) => {
		return (
			<div className='w-full'>
				{label && (
					<label className='block text-sm font-medium text-gray-700 mb-2'>
						{label}
					</label>
				)}
				<div className='relative'>
					<input
						ref={ref}
						className={cn(
							'w-full px-4 py-3 border border-gray-200 rounded-lg text-sm transition-all duration-200 outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60',
							error && 'border-red-500 focus:ring-red-500',
							success && 'border-green-500 focus:ring-green-500',
							rightElement && 'pr-12',
							className
						)}
						{...props}
					/>
					{rightElement && (
						<div className='absolute right-3 top-1/2 -translate-y-1/2'>
							{rightElement}
						</div>
					)}
				</div>
				{(error || helperText) && (
					<p
						className={cn(
							'mt-1 text-sm',
							error ? 'text-red-500' : 'text-gray-500'
						)}>
						{error || helperText}
					</p>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;

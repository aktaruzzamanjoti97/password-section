import { cn } from '@/lib/utils/cn';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
	title?: string;
	subtitle?: string;
}

const Card: React.FC<CardProps> = ({
	title,
	subtitle,
	children,
	className,
	...props
}) => {
	return (
		<div
			className={cn(
				'bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8',
				className
			)}
			{...props}>
			{(title || subtitle) && (
				<div className='mb-6'>
					{title && (
						<h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
					)}
					{subtitle && <p className='mt-1 text-gray-600'>{subtitle}</p>}
				</div>
			)}
			{children}
		</div>
	);
};

export default Card;

import React from 'react';

interface IconProps {
	className?: string;
	active?: boolean;
}

export const CheckIcon: React.FC<IconProps> = ({
	className,
	active = false,
}) => (
	<div
		className={`inline-flex items-center justify-center w-5 h-5 rounded-full transition-all ${
			active ? 'bg-green-500' : 'bg-gray-300'
		}`}>
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={`w-3 h-3 ${active ? 'text-white' : 'text-gray-500'}`}
			viewBox='0 0 20 20'
			fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
				clipRule='evenodd'
			/>
		</svg>
	</div>
);

export const XIcon: React.FC<IconProps> = ({ className }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		width='20'
		height='20'
		viewBox='0 0 24 24'
		fill='none'
		stroke='currentColor'
		strokeWidth='2'
		strokeLinecap='round'
		strokeLinejoin='round'>
		<line x1='18' y1='6' x2='6' y2='18'></line>
		<line x1='6' y1='6' x2='18' y2='18'></line>
	</svg>
);

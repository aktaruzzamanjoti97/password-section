'use client';

import { XIcon } from '@/components/icons/CheckIcon';
import { cn } from '@/lib/utils/cn';
import React, { useEffect } from 'react';

interface ToastProps {
	id: string;
	type: 'success' | 'error' | 'warning' | 'info';
	title: string;
	message?: string;
	duration?: number;
	onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
	id,
	type,
	title,
	message,
	duration = 5000,
	onClose,
}) => {
	useEffect(() => {
		if (duration > 0) {
			const timer = setTimeout(() => {
				onClose(id);
			}, duration);
			return () => clearTimeout(timer);
		}
	}, [duration, id, onClose]);

	const types = {
		success: 'bg-green-50 border-green-200 text-green-800',
		error: 'bg-red-50 border-red-200 text-red-800',
		warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
		info: 'bg-blue-50 border-blue-200 text-blue-800',
	};

	const icons = {
		success: '✓',
		error: '✕',
		warning: '!',
		info: 'i',
	};

	return (
		<div
			className={cn(
				'flex items-start gap-3 p-4 border rounded-lg shadow-lg',
				types[type]
			)}>
			<span className='text-xl'>{icons[type]}</span>
			<div className='flex-1'>
				<h4 className='font-semibold'>{title}</h4>
				{message && <p className='mt-1 text-sm opacity-90'>{message}</p>}
			</div>
			<button
				onClick={() => onClose(id)}
				className='p-1 hover:opacity-70 transition-opacity'>
				<XIcon className='w-4 h-4' />
			</button>
		</div>
	);
};

export default Toast;

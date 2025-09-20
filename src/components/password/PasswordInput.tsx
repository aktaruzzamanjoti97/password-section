/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { EyeIcon, EyeOffIcon } from '@/components/icons/EyeIcon';
import Input from '@/components/ui/Input';
import React, { useState } from 'react';

interface PasswordInputProps
	extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string;
	error?: string;
	success?: boolean;
	register?: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
	label,
	error,
	success,
	register,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const toggleVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Input
			{...register}
			{...props}
			type={showPassword ? 'text' : 'password'}
			label={label}
			error={error}
			success={success}
			rightElement={
				<button
					type='button'
					onClick={toggleVisibility}
					className='text-gray-500 hover:text-gray-700 transition-colors'
					tabIndex={-1}>
					{showPassword ? (
						<EyeOffIcon className='w-5 h-5' />
					) : (
						<EyeIcon className='w-5 h-5' />
					)}
				</button>
			}
		/>
	);
};

export default PasswordInput;

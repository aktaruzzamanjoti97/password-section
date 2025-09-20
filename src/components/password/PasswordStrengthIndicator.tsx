'use client';

import { CheckIcon } from '@/components/icons/CheckIcon';
import { validatePasswordStrength } from '@/lib/validations/passwordSchema';
import React from 'react';

interface PasswordStrengthIndicatorProps {
	password: string;
}

const PasswordStrengthIndicator: React.FC<PasswordStrengthIndicatorProps> = ({
	password,
}) => {
	const criteria = validatePasswordStrength(password);

	const requirements = [
		{ key: 'length', label: '8 - 64 characters', met: criteria.length },
		{
			key: 'uppercase',
			label: 'One uppercase letter',
			met: criteria.uppercase,
		},
		{
			key: 'lowercase',
			label: 'One lowercase letter',
			met: criteria.lowercase,
		},
		{ key: 'number', label: 'One number', met: criteria.number },
		{
			key: 'special',
			label: 'One special character (e.g., ! @ # $ % ^ & *)',
			met: criteria.special,
		},
	];

	return (
		<div className='space-y-2 p-4 bg-gray-50 rounded-lg'>
			{requirements.map((req) => (
				<div key={req.key} className='flex items-center gap-2'>
					<CheckIcon active={req.met} />
					<span
						className={`text-sm ${
							req.met ? 'text-green-600 font-medium' : 'text-gray-600'
						}`}>
						{req.label}
					</span>
				</div>
			))}
		</div>
	);
};

export default PasswordStrengthIndicator;

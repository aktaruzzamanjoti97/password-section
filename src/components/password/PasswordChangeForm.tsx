'use client';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Toast from '@/components/ui/Toast';
import {
	PasswordChangeFormData,
	passwordChangeSchema,
} from '@/lib/validations/passwordSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PasswordInput from './PasswordInput';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const PasswordChangeForm: React.FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [toasts, setToasts] = useState<
		Array<{
			id: string;
			type: 'success' | 'error';
			title: string;
			message?: string;
		}>
	>([]);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
		reset,
	} = useForm<PasswordChangeFormData>({
		resolver: zodResolver(passwordChangeSchema),
		mode: 'onChange',
	});

	const newPassword = watch('newPassword');
	const confirmPassword = watch('confirmPassword');

	const addToast = (
		type: 'success' | 'error',
		title: string,
		message?: string
	) => {
		const id = Date.now().toString();
		setToasts((prev) => [...prev, { id, type, title, message }]);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((toast) => toast.id !== id));
	};

	const onSubmit = async (data: PasswordChangeFormData) => {
		setIsSubmitting(true);

		try {
			// // Validate current password
			// const validateResponse = await fetch('/api/auth/validate-password', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ password: data.currentPassword }),
			// });

			// if (!validateResponse.ok) {
			// 	const error = await validateResponse.json();
			// 	setError('currentPassword', {
			// 		type: 'manual',
			// 		message:
			// 			error.message ||
			// 			'Sorry, the password that you have provided is incorrect',
			// 	});
			// 	setIsSubmitting(false);
			// 	return;
			// }

			// // Change password
			// const changeResponse = await fetch('/api/auth/change-password', {
			// 	method: 'POST',
			// 	headers: { 'Content-Type': 'application/json' },
			// 	body: JSON.stringify({ newPassword: data.newPassword }),
			// });

			// if (!changeResponse.ok) {
			// 	throw new Error('Failed to change password');
			// }

			addToast(
				'success',
				'Changes saved successfully',
				'Your password has been updated.'
			);
			reset();
		} catch (error) {
			addToast(
				'error',
				'Unexpected error',
				'Please try again later or contact support.'
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Check if passwords match for visual feedback
	const passwordsMatch = confirmPassword && newPassword === confirmPassword;
	const passwordsMismatch = confirmPassword && newPassword !== confirmPassword;

	return (
		<>
			<Card
				title='Manage Security'
				subtitle='Protect your data and ensure secure interactions.'>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<PasswordInput
						label='Current password'
						placeholder='Enter your current password'
						error={errors.currentPassword?.message}
						{...register('currentPassword')}
					/>

					<div>
						<PasswordInput
							label='New password'
							placeholder='Enter your new password'
							error={errors.newPassword?.message}
							{...register('newPassword')}
						/>
						{newPassword && (
							<div className='mt-4'>
								<PasswordStrengthIndicator password={newPassword} />
							</div>
						)}
					</div>

					<PasswordInput
						label='Confirm new password'
						placeholder='Repeat your new password'
						error={errors.confirmPassword?.message}
						success={Boolean(passwordsMatch && !passwordsMismatch)}
						{...register('confirmPassword')}
					/>

					<div className='pt-4'>
						<Button
							type='submit'
							loading={isSubmitting}
							disabled={!isValid || isSubmitting}
							fullWidth>
							Save changes
						</Button>
					</div>
				</form>
			</Card>

			{/* Toast Container */}
			<div className='fixed top-4 right-4 z-50 space-y-2 max-w-md'>
				{toasts.map((toast) => (
					<Toast
						key={toast.id}
						id={toast.id}
						type={toast.type}
						title={toast.title}
						message={toast.message}
						onClose={removeToast}
					/>
				))}
			</div>
		</>
	);
};

export default PasswordChangeForm;

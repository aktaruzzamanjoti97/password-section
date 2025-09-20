import { z } from 'zod';

const passwordRegex = {
	uppercase: /[A-Z]/,
	lowercase: /[a-z]/,
	number: /[0-9]/,
	special: /[!@#$%^&*(),.?":{}|<>]/,
};

export const passwordSchema = z
	.string()
	.min(8, 'Password must be at least 8 characters')
	.max(64, 'Password must be at most 64 characters')
	.refine((password) => passwordRegex.uppercase.test(password), {
		message: 'Password must contain at least one uppercase letter',
	})
	.refine((password) => passwordRegex.lowercase.test(password), {
		message: 'Password must contain at least one lowercase letter',
	})
	.refine((password) => passwordRegex.number.test(password), {
		message: 'Password must contain at least one number',
	})
	.refine((password) => passwordRegex.special.test(password), {
		message: 'Password must contain at least one special character',
	});

export const passwordChangeSchema = z
	.object({
		currentPassword: z.string().min(1, 'Current password is required'),
		newPassword: passwordSchema,
		confirmPassword: z.string().min(1, 'Please confirm your new password'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: 'New password must be different from current password',
		path: ['newPassword'],
	});

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

export const validatePasswordStrength = (password: string) => {
	return {
		length: password.length >= 8 && password.length <= 64,
		uppercase: passwordRegex.uppercase.test(password),
		lowercase: passwordRegex.lowercase.test(password),
		number: passwordRegex.number.test(password),
		special: passwordRegex.special.test(password),
	};
};

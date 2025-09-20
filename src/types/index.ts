export interface User {
	id: string;
	email: string;
	password: string;
	name: string;
}

export interface PasswordChangeData {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface ApiResponse<T = any> {
	success: boolean;
	message?: string;
	data?: T;
	error?: string;
}

export interface ValidationResult {
	isValid: boolean;
	criteria: PasswordCriteria;
}

export interface PasswordCriteria {
	length: boolean;
	uppercase: boolean;
	lowercase: boolean;
	number: boolean;
	special: boolean;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
	id: string;
	type: ToastType;
	title: string;
	message?: string;
	duration?: number;
}

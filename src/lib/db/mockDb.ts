// Mock database for demonstration
// In production, replace with actual database queries

interface User {
	id: string;
	email: string;
	password: string; // In production, this should be hashed
	name: string;
}

// Mock users data
const users: User[] = [
	{
		id: '1',
		email: 'user@example.com',
		password: 'CurrentPass123!', // In production, use bcrypt or similar
		name: 'John Doe',
	},
];

// Mock current user (in production, get from session)
export const getCurrentUser = async (): Promise<User | null> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 100));
	return users[0];
};

export const validatePassword = async (
	userId: string,
	password: string
): Promise<boolean> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 300));
	const user = users.find((u) => u.id === userId);
	return user?.password === password;
};

export const updatePassword = async (
	userId: string,
	newPassword: string
): Promise<boolean> => {
	// Simulate API delay
	await new Promise((resolve) => setTimeout(resolve, 500));
	const user = users.find((u) => u.id === userId);
	if (user) {
		user.password = newPassword;
		return true;
	}
	return false;
};

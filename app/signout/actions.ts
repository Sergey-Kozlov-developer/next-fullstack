'use server'
import {redirect} from "next/navigation";
import {prisma} from '@/lib/db';
import bcrypt from 'bcryptjs';

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type SignUpState = { error?: string };

export async function signupAction (_prevState: SignUpState | null, formData: FormData): Promise<SignUpState> {
	const name = formData.get('name') as string | undefined;
	const email = formData.get('email') as string | undefined;
	const password = formData.get('password') as string | undefined;

	if(!email) {
		return {error: 'Email обязателен'};
	}
	if (!EMAIL_REGEX.test(email)) {
		return {error: 'Некорректный email'}
	}
	if (!password || password.length < MIN_PASSWORD_LENGTH) {
		return {error: 'Пароль должен быть не менее 8 символов'}
	}
	const existing = await prisma.user.findUnique({where: {email}})
	if(existing) {
		return {error: 'Email занят'}
	}
	const hashedPassword = await bcrypt.hash(password, 10)

	await prisma.user.create({
		data: {
			name,email, password: hashedPassword
		}
	})

	redirect('/login')
}



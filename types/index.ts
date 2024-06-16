import {
	DeliveryType,
	OrderStatus,
	PaymentType,
	ProductType,
	Role,
	UserStatus
} from '@prisma/client';
import { number, z } from 'zod';

// Redux Loading Status

export type ReduxStatusLoading = 'pending' | 'succeeded' | 'failed';

// Sidebar Type

// User Types

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	surname: string;
	login?: string;
	recovery_key?: string;
	role: Role;
	status?: UserStatus;
	avatar?: string | null;
	description?: string | null;
	phone: string;
	createdAt: string;
	deletedAt?: string;
};

export type UserFilters = {
	role: string | null;
	searchValue: string;
};

export type ReduxUsersState = {
	users: User[] | null;
	loading: ReduxStatusLoading;
};

export type ReduxSelectUsersState = {
	selectUser: User | null;
	loading: ReduxStatusLoading;
};

// Profile Types

export type ReduxProfileState = {
	profile: User | null;
	loading: ReduxStatusLoading;
};

// Order Types

export type Order = {
	id: number;
	phone: string;
	email?: string;
	name: string;
	payment: PaymentType;
	comments?: string;
	delivery: DeliveryType;
	street: string;
	house: number;
	is_private_house?: boolean;
	apartment?: number;
	entrance?: number;
	createdAt: string;
	status: OrderStatus;
	products: Product[];
};

export type ReduxOrderState = {
	ordersWithStatus: Order[] | null;
	orders: Order[] | null;
	loading: ReduxStatusLoading;
};

// Product Types

export type Product = {
	id: string | null | undefined;
	title: string;
	description: string;
	type: ProductType;
	price: string;
	details: {
		[key: string]: string;
	};
	compound: string[];
	image: string;
	popularity: number;
};

export type ReduxProductState = {
	goods: Product[] | null;
	loading: ReduxStatusLoading;
	isFilters: boolean;
};

export type ProductFilters = {
	sort: string | null;
	productType: string | null;
	searchValue: string;
};

// Enums

export enum CategoryEnum {
	PIZZA = 'Пицца',
	SETS = 'Сеты',
	WOK = 'WOK',
	ROLS = 'Роллы',
	SUSHI = 'Суши',
	BEVERAGES = 'Напитки'
}

export enum RoleEnum {
	ADMIN = 'Администратор',
	MENEGER = 'Менеджер',
	DIRECTOR = 'Директор',
	COURIER = 'Курьер',
	COOK = 'Повар'
}

export enum OrderStatusEnum {
	PROCESSING = 'Новый',
	GETTINGREADY = 'На готовке',
	DELIVERED = 'Доставляется',
	ISSUED = 'Закрыт'
}

export enum DeliveryEnum {
	BYCOURIER = 'Курьером',
	PICKUP = 'Самовывоз'
}
export enum PaymentEnum {
	CASH = 'Наличными',
	BYCARD = 'Картой'
}

// Form Schemas

export const AuthSchema = z.object({
	login: z.string().min(1, {
		message: 'Обязательное поле'
	}),
	password: z.string().min(1, {
		message: 'Обязательное поле'
	})
});

export const RecoveryChekSchema = z.object({
	login: z.string().min(1, {
		message: 'Обязательное поле'
	}),
	recovery_key: z
		.string()
		.min(1, {
			message: 'Обязательное поле'
		})
		.refine(
			(value) =>
				/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(
					value
				),
			{
				message: 'Неверный формат ключа'
			}
		)
});

export const RecoveryResetPasswordSchema = z
	.object({
		password: z.string().min(8, {
			message: 'Минимальная длинна пароля 8 символов'
		}),
		confirmPass: z.string().min(1, {
			message: 'Обязательное поле'
		})
	})
	.refine((data) => data.password === data.confirmPass, {
		message: 'Пароли не совпадают',
		path: ['confirmPass']
	});

export const RegisterUserSchema = z
	.object({
		firstName: z.string().min(1, {
			message: 'Обязательное поле'
		}),
		lastName: z.string().min(1, {
			message: 'Обязательное поле'
		}),
		surname: z.string().min(1, {
			message: 'Обязательное поле'
		}),
		phone: z
			.string({
				required_error: 'Обязательное поле'
			})
			.min(18, {
				message: 'Неверный формат телефона'
			}),
		role: z.nativeEnum(Role, {
			required_error: 'Обязательное поле'
		}),
		login: z.string().min(1, {
			message: 'Обязательное поле'
		}),
		password: z.string().min(8, {
			message: 'Минимальная длинна пароля 8 символов'
		}),
		confirmPass: z.string().min(1, {
			message: 'Обязательное поле'
		})
	})
	.refine((data) => data.password === data.confirmPass, {
		message: 'Пароли не совпадают',
		path: ['confirmPass']
	});

export const ProductSchema = z.object({
	title: z.string().min(1, {
		message: 'Обязательное поле'
	}),
	description: z.string().min(10, {
		message: 'Минимальная длинна описания 10 символов'
	}),
	type: z.nativeEnum(ProductType, {
		required_error: 'Обязательное поле',
		invalid_type_error: 'Обязательное поле'
	}),
	price: z.string().min(1, {
		message: 'Обязательное поле'
	}),
	details: z.record(
		z
			.string()
			.min(1, {
				message: 'Обязательное поле'
			})
			.optional()
	),
	compound: z.array(z.string()),
	image: z.string().min(1, {
		message: 'Загрузите изображение'
	})
});

export const RemoveUserSchema = z.object({
	recovery_key: z
		.string()
		.min(1, {
			message: 'Обязательное поле'
		})
		.refine(
			(value) =>
				/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/.test(
					value
				),
			{
				message: 'Неверный формат ключа'
			}
		)
});

export const EditProfileSchema = z.object({
	firstName: z.string().min(1, {
		message: 'Обязательное поле'
	}),
	lastName: z.string().min(1, {
		message: 'Обязательное поле'
	}),
	surname: z.string().min(1, {
		message: 'Обязательное поле'
	}),
	phone: z
		.string({
			required_error: 'Обязательное поле'
		})
		.min(18, {
			message: 'Неверный формат телефона'
		}),
	description: z.string().nullable().optional(),
	avatar: z.string().nullable().optional()
});

export const ChangeLoginSchema = z.object({
	login: z.string().min(1, {
		message: 'Обязательное поле'
	}),
	password: z.string().min(8, {
		message: 'Обязательное поле'
	})
});

export const ResetPasswordSchema = z
	.object({
		currentPassword: z.string().min(1, {
			message: 'Обязательное поле'
		}),
		password: z.string().min(8, {
			message: 'Минимальная длинна пароля 8 символов'
		}),
		confirmPass: z.string().min(1, {
			message: 'Обязательное поле'
		})
	})
	.refine((data) => data.password === data.confirmPass, {
		message: 'Пароли не совпадают',
		path: ['confirmPass']
	});

export type AuthType = z.infer<typeof AuthSchema>;
export type ProductFormType = z.infer<typeof ProductSchema>;
export type RemoveUserType = z.infer<typeof RemoveUserSchema>;
export type EditProfileType = z.infer<typeof EditProfileSchema>;
export type ChangeLoginType = z.infer<typeof ChangeLoginSchema>;
export type RecoveryChekType = z.infer<typeof RecoveryChekSchema>;
export type RegisterUserType = z.infer<typeof RegisterUserSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export type RecoveryResetPasswordType = z.infer<
	typeof RecoveryResetPasswordSchema
>;

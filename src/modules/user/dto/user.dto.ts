import { IUser } from '../interface/user.interface';

export type CreateUserDto = Pick<IUser, 'name' | 'email' | 'password'>;

export type UpdateUserDto = Partial<CreateUserDto>;

export type UserResponseDto = Omit<IUser, 'password'>;
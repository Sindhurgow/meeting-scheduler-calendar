import User from '../model/user.model';

export const createUser = async (data: any) => {
    return await User.create(data);
};

export const getUserById = async (id: string) => {
    return await User.findByPk(id);
};

export const getAllUsers = async () => {
    return await User.findAll();
};
const User = require('../model/user.model');

class UserService {
    
    async createUser(data) {
        const { name, email } = data;
        
        return await User.create({ name, email });
    }

    async getAllUsers() {
        return await User.findAll();
    }

    async getUserById(id) {
        return await User.findByPk(id);
    }

}

module.exports = new UserService();
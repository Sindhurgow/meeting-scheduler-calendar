const userService = require('../service/user.service');

class UserController {

    async createUser(req, res) {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ message: 'Name and Email are required' });
            }

            const user = await userService.createUser(req.body);

            res.status(201).json({
                message: 'User created successfully',
                user
            });

        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ message: 'User with this email already exists' });
            }
            res.status(500).json({ message: error.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new UserController();
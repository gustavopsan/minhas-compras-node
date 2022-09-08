const userModel = require('../../models/user');

async function createUser(name, email, password, avatarUrl) {
    try {
        const userCreated = await userModel.create(
            {
                name,
                email,
                password,
                avatarUrl,
                isActive: true
            }
        );
        return userCreated;
    } catch (error) {
        return error;
    }
}

module.exports = createUser;
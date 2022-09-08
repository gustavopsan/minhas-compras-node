const userModel = require('../../models/user');

async function authenticateUser(email, password) {
    try {
        const user = await userModel.findOne({ email });

        if(!user) {
            return {
                errorId: 'auth_01',
                message: 'User not found'
            }
        } else if (user.password !== password) {
            return {
                errorId: 'auth_02',
                message: 'Password incorrect'
            }
        } else if (!user.isActive) {
            return {
                errorId: 'auth_03',
                message: 'User is not active'
            }
        } else {
            return {
                userId: user._id,
                name: user.name,
                email: user.email,
                avatarUrl: user.avatarUrl,
                isActive: user.isActive
            };
        }
    } catch (error) {
        return error
    }
}

module.exports = authenticateUser;
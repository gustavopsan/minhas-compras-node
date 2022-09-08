const JWT = require('jsonwebtoken');
const userModel = require('../../models/user');

async function checkSession(token) {
    try {
        const decoded = JWT.verify(token, process.env.SECRET);
        const user = await userModel.findById(decoded.id);

        if (!user) {
            return {
                errorId: 'session_01',
                error: 'User not found'
            }
        }

        return {
            userId: user._id,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatarUrl,
            isActive: user.isActive
        };
    } catch (error) {
        return error
    }
}

module.exports = checkSession;
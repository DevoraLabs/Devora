const tokenService = require('../service/tokenService');

function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }

        const accessToken = authHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({ message: 'Пользователь не авторизован' });
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(401).json({ message: 'Невалидный токен' });
        }

        req.user = userData;
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Ошибка авторизации' });
    }
};

module.exports = authMiddleware;
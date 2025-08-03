require('dotenv').config()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const tokenService = require('../service/tokenService')
const { validationResult } = require('express-validator')

class authController {
    async signup(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при валидации', errors: errors.array() })
            }

            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({ message: `Пользователь с именем ${username} уже существует` })
            }

            const hashPassword = await bcrypt.hash(password, 7)
            const user = await User.create({username, password: hashPassword})

            const tokens = tokenService.generateTokens({ id: user._id, username: user.username })
            await tokenService.saveToken(user._id, tokens.refreshToken)

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json({...tokens, user})
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const candidate = await User.findOne({username})
            if (!candidate) {
                return res.status(400).json({ message: 'Пользователь не найден' })
            }

            const isPassEquals = await bcrypt.compare(password, candidate.password)
            if (!isPassEquals) {
                return res.status(400).json({ message: 'Неверный пароль' })
            }

            const tokens = tokenService.generateTokens({ id: candidate._id, username: candidate.username }) 
            await tokenService.saveToken(candidate._id, tokens.refreshToken)

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json({...tokens, user: candidate});
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async logout(req, res) {
        try {
            const {refreshToken} = req.cookies;
            await tokenService.removeToken(refreshToken)
            res.clearCookie('refreshToken');
            return res.json({ message: 'Выход выполнен' });
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }

    async refresh(req, res) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) {
                return res.status(401).json({ message: 'Нет токена' });
            }

            const userData = tokenService.validateRefreshToken(refreshToken)
            const tokenFromDb = await tokenService.findToken(refreshToken)
            if (!userData || !tokenFromDb) {
                return res.status(401).json({ message: 'Невалидный токен' });
            } 

            const user = await User.findById(userData.id)
            const tokens = tokenService.generateTokens({ id: user._id, username: user.username })
            await tokenService.saveToken(user._id, tokens.refreshToken)

            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json({ ...tokens, user });
        } catch (e) {
            res.status(500).json({ message: 'Ошибка сервера' });
        }
    }
}

module.exports = new authController()
const User = require('../models/User')

class userController {
    async getUser(req, res) {
        try {
            const { username } = req.params
            const user = await User.findOne({ username })

            if(!user) {
                return res.status(400).json({ message: "Пользователь не найден" })
            }

            return res.json(user)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка при получении пользователя' })
        }
    }

    async updateUser(req, res) {
        try {
            const { username } = req.params
            const updatedData = req.body

            const updatedUser = await User.findOneAndUpdate(
                { username },
                updatedData,
                { new: true }
            )

            if(!updatedUser) {
                return res.status(400).json({ message: "Пользователь не найден" })
            }

            return res.json(updatedUser)
        } catch (error) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка при обновлении пользователя' })
        }
    }
}

module.exports = new userController()
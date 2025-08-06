const Startup = require('../models/Startup')

class startupController {
    async createStartup(req, res) {
        try {
            const { founder, name, description, team } = req.body;

            const startup = new Startup({
                founder,
                name,
                description,
                team
            });

            await startup.save();

            res.status(201).json({ message: 'Стартап успешно создан', startup });
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка при создании стартапа' })
        }
    }

    async getAllStartups(req, res) {
        try {
            const startups = await Startup.find();
            res.json(startups);
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка при получении стартапов' })
        }
    }

    async getMyStartups(req, res) {
        try {
            const { username } = req.params;
            if (!username) {
                return res.status(400).json({ message: 'Username не передан' });
            }
            const myStartups = await Startup.find({ founder: username })
            res.json(myStartups)
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Ошибка при получении стартапов пользователя' })
        }
    }
}

module.exports = new startupController()
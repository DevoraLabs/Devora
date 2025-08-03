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
}

module.exports = new startupController()
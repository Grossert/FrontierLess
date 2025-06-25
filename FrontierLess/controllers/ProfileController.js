const Project = require('../models/Project');
const User = require('../models/User');

module.exports = class ProfileController {

    static async getProfile(req, res) {
        try {
            const userProfile = await User.findOne({ 
                where: { id: req.session.userid },
                attributes: ['id', 'name', 'email'],
            });

            if (!userProfile) {
                return res.status(404).send('User not found');
            }

            const userProjects = await Project.findAll({ 
                where: { UserId: req.session.userid },
                include: {
                    model: User,
                    attributes: ['id', 'name', 'email'],
                },
            });

            // Retorna o perfil do usuário e os projetos em um objeto JSON
            return res.status(200).send({ userProfile, userProjects });

        } catch (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
    }
}

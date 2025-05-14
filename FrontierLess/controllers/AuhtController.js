const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {

    static async loginPost(req, res) {
        console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send('Email e senha são obrigatórios');
        }

        // Encontrar usuário
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            return res.status(403).send('Credenciais inválidas');
        }

        // Verificar se a senha coincide
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            return res.status(403).send('Credenciais inválidas');
        }

        // Inicializar sessão
        req.session.userid = user.id;

        req.session.save(() => {
            return res.status(200).send({ message: 'Login bem-sucedido', user });
        });
    }

    static logout(req, res) {
        req.session.destroy(() => {
            console.log('Sessão encerrada');
            return res.status(200).send('Logout realizado com sucesso');
        });
    }
}

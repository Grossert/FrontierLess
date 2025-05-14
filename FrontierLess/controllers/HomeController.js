const User = require('../models/User')

module.exports = class HomeController {

    static getHome(req, res) {
        return res.status(200).send("Alô mamãe!")
    }

}
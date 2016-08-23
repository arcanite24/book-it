/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');
var SHA256 = require('crypto-js/sha256');

module.exports = {
	register: function (req, res) {
		var params = req.allParams();
		if (params.username && params.password) {
			var hash_password = SHA256(params.password).toString();
			User.create({username: params.username, password: params.password}).then(function(user) {
				if (user) {
					return res.json({user: user});
				} else {
					return res.json(500, {error: true, message: 'Error al crear usuario'});
				}
			});
		}
		
		return res.json({hola: hash_password});
	},

	login: function (req, res) {

	}
};

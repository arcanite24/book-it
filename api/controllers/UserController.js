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
		var hash_password = SHA256(params.password).toString();
		return res.json({hola: hash_password});
	},

	login: function (req, res) {

	}
};

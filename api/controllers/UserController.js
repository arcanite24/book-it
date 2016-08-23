/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

module.exports = {
	register: function (req, res) {
<<<<<<< HEAD
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
=======
		var params = req.param('datos');
		bcrypt.hash(params.password, 10, function (err, hash) {
			if (err) {
				return res.json(500, {err: err, message: 'Error al crear usuario.'});
			} else {
				var tempUser = {
					username: params.username,
					password: hash,
					name: params.name,
					borndate: params.borndate
				};
				User.create(tempUser).then(function(data) {
					console.log(data);
					return res.json({user: data, message: 'Usuario registrado correctamente.'});
				}).catch(function(err) {
					console.log(err);
				  return res.json(500, {err: err, message: 'Error al crear usuario.'});
				});
			}
		});
>>>>>>> 30e7b7f4811ac45e271f846f0d88c41bb4ff8ab2
	},

	login: function (req, res) {
		var username = req.param('username');
		var password = req.param('password');
		User.findOne({username: username}).then(function(data) {
		  if (data) {
				bcrypt.compare(password, data.password, function (err, respuesta_compare) {
					if (respuesta_compare) {
						var token = jwt.sign(data, sails.config.seguridad.secretJWT);
						RealtimeService.publishAction('realtime-bookit', 'user-login', {user: data, ip: req.ip, headers: req.headers});
						return res.json({token: token, user: data});
					} else if (err) {
						console.log(err);
						return res.json({err: true, message: 'Error, las contraseñas no coinciden.'});
					} else {
						return res.json(500, {err: err, message: 'Error con el servidor.'});
					}
				});
		  } else {
				return res.json({err: true, message: 'Usuario no encontrado.'});
			}
		}).catch(function(err) {
			console.log(err);
		  return res.json(500, {err: err});
		});
	}
};

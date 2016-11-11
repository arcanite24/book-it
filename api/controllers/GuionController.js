/**
 * GuionController
 *
 * @description :: Server-side logic for managing Guions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var q = require("q");

module.exports = {
	
	getByUser: function (req, res) {
	  var id = req.param('id');
	  Guion.find({owner: id}).then(function (data) {
	    return res.json(data);
	  }).catch(function (err) {
	    console.log('ERROR: ', err)
	    return res.json(500, {err: true});
	  });
	},
	
	getActScenes: function (req, res) {
		var id = req.param('id');
		GuionActo.findOne({id: id}).populateAll().then(function (data) {
			return res.json(data.scenes);
		}).catch(function (err) {
			console.log(err)
			return res.json([]);
		});
	},
	
	getGuionScenes: function (req, res) {
		var id = req.param('id');
		GuionActo.find({guionRoot: id}).populateAll().then(function (dataRoot) {
			//Obtener todos los actos
			var scenes = [];
			dataRoot.forEach(function(acto) {
				if (acto.scenes) {
					scenes = scenes.concat(acto.scenes);
				}
			});
			return res.json(scenes);
		}).catch(function(err) {
			console.log(err);
			return res.json(500, []);
		});
	},
	
	getCuadrosEscena: function (req, res) {
		var id = req.param('id');
		GuionEscena.findOne({id: id}).populateAll().then(function (data) {
			return res.json(data.cuadros);
		}).catch(function (err) {
			console.log(err)
			return res.json([]);
		});
	}
	
};


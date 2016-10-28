/**
 * PoemaController
 *
 * @description :: Server-side logic for managing Poemas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	getByUser: function (req, res) {
	  var id = req.param('id');
	  Poema.find({owner: id}).then(function (data) {
	    return res.json(data);
	  }).catch(function (err) {
	    console.log('ERROR: ', err)
	    return res.json(500, {err: true});
	  });
	}
	
};


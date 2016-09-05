/**
 * HelperController
 *
 * @description :: Server-side logic for managing Helpers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var cloudinary = require("cloudinary");
cloudinary.config({
   cloud_name: 'dnhhwexyc',
   api_key: '976496778872556',
   api_secret: 'xJt8Fye8e4vYXF624gBeggj3ahg'
 });

module.exports = {
	
	upload: function (req, res) {
	  req.file('image').upload(function (err, uploadedFiles) {
      if (err) {
        return res.json(500, {error: true, message: err});
      } else {
        cloudinary.uploader.upload(uploadedFiles[0].fd, function (resultado) {
          return res.json(resultado);
        });
      }
    });
	}
	
};


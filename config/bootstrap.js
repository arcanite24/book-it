/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  User.findOrCreate({username: 'admin@admin.com'}, {
    username: 'admin@admin.com',
    password: '123',
    borndate: '1990/10/10',
    edad: 999,
    pregunta: 'Porque el chino es tan chino',
    respuesta: 'porque si',
    role: 'ROLE_ADMIN',
    name: 'Admin caguai'
  }).then().catch(function (err) {
    console.log(err)
  });
  
  cb();
};

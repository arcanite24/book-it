/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    borndate: {
      type: 'date',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    edad: {
      type: 'integer',
      required: true
    },
    pregunta: {
      type: 'string',
      required: true
    },
    respuesta: {
      type: 'string',
      required: true
    },
    
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};

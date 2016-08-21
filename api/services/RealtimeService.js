module.exports = {

  joinRoom: function (room, socket) {
    sails.sockets.join(socket, room);
  },

  publishAction: function (room, event, data) {
    sails.sockets.broadcast(room, event, data);
  }

};

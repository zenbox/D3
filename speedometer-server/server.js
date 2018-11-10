/*global console, require, setInterval */
(function () {
  /**
   * a simple socket based data service
   *
   * @package Application
   * @author Michael [michael@zenbox.de]
   * @since 2017/03/19
   * @version v1.0.0
   * @copyright (c) 2017 Michael Reichart, Cologne
   * @license MIT License [https://opensource.org/licenses/MIT]
   */
  'use strict';
  // - - - - - - - - - -
  const http = require('http');
  const httpServer = http.createServer();
  const socketServer = require('websocket')
    .server;
  const port = 1337;
  const socket = new socketServer({
    httpServer: httpServer
  });
  const dns = require('dns');

  // starting the webservice
  httpServer.listen(port);

  console.log('- - - - - - - - - - - - - - - - - - - - -');
  console.log('a http server runs on port ' + port + ',');
  console.log('press strg-c to stop it.');
  console.log('- - - - - - - - - - - - - - - - - - - - -');

  // gives the local ipAddress
  dns.lookup(require('os')
    .hostname(),
    function (err, add, fam) {
      console.log('local ip: ' + add);
      console.log('- - - - - - - - - - - - - - - - - - - - -');
    })

  // socket eventlistener for initial request
  socket.on('request', function (request) {

    // build the connection
    let connection = request.accept(null, request.origin);

    // eventlistener for messages
    connection.on('message', function (message) {

      // show browser messages
      console.log(message.utf8Data);

      // send random data
      setInterval(function () {
        let data = {
          rotate: Math.random() * 360 - Math.random() * 360
        };
        connection.sendUTF(JSON.stringify(data));
      }, 1000);
    });
    connection.on('close', function () {
      console.log('connection closed!');
    });
  });
  // - - - - - - - - - -
}());
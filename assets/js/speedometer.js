/**
 * Scripts for the Speedometer Application
 * @author Michael
 * @since 2018/11/06
 * @version 1.0.0
 */
// IIFE - Immediate Invoked Function Expression
(function () {
  'use strict';
  // - - - - - - - - - -

  // declaration
  let
    ipAddress = '192.168.188.30',
    socket = new WebSocket('ws://' + ipAddress + ':1337'),
    needle = document.querySelector('#needle');

  // methods
  function rotateNeedle(d) {
    let degree = d || null;

    if (degree !== null) {
      needle.setAttribute('transform', 'translate(200,200) rotate(' + degree + ')');
    } else {}
  }

  // control (event based)
  socket.onopen = function () {
    socket.send('another hello from outerspace!');
  };
  socket.onmessage = function (message) {
    let
      data = JSON.parse(message.data),
      alpha = data.rotate;
    console.log(alpha);
    rotateNeedle(alpha);
  };
  // - - - - - - - - - -
}());
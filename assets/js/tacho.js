/**
 * Scripts for the Tacho Application
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
    socket = new WebSocket('ws://192.168.55.95:1337'),
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
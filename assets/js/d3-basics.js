/**
 * A Simple Approach to D3
 * @author Michael
 * @since 2018/11/07
 * @version 1.0.0
 */
!(function () {
  'use strict';
  // - - - - - - - - - - -
  console.dir(d3);

  // jQuery:
  // $('main').addClass('myClass');

  d3.selectAll('h1, p, address')
    .style('color', 'white');

  d3.select('body')
    .style('background-color', 'black');

  d3.selectAll('p')
    .data([15, 17, 19, 21])
    .style('font-size', function (d, i) {
      return d + 'px';
    });

  d3.select('main')
    .selectAll()
    .data([20, 24, 28, 31, 36, 40, 44])
    .enter()
    .append('p')
    .style('color', 'white')
    .text(function (d, i) {
      return 'content ' + (i + 1);
    })
    .style('font-size', function (d, i) {
      return d + 'px';
    })


  // - - - - - - - - - - -
}());
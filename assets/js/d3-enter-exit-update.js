/**
 * D3 Enter, Exit, Update
 *
 * @author Michael [michael@zenbox.de]
 * @since 2018/11/09
 * @version v1.0.0
 */

!(function () {
  'use strict';
  // - - - - - - - - - -

  let
    data1 = ['A', 'B', 'C', 'D', 'E'],
    data2 = ['a', 'b'],
    group = undefined;

  // Group
  group = d3.select('main')
    .selectAll('div')
    .data(data1);
  //
  // // Enter
  // group
  //   .enter()
  //   .append('div')
  //   .classed('circle', true)
  //   .text(function (d, i) {
  //     return d;
  //   });

  // Exit
  group
    .exit()
    .remove();

  function onButtonClick() {
    // group
    //   .exit()
    //   .remove();
    //
    // group
    //   .enter()
    //   .append('div')
    //   .classed('circle', true)
    //   .text(function (d, i) {
    //     return d;
    //   });
    //
    // group
    //   .enter()
    //   .transition()
    //   .duration(1000)
    //   .attr('style', 'background-color', function (d, i) {
    //     return d3.schemeCategory10[i];
    //   });

    // Merge
    group
      .enter()
      .append('div')
      .merge(group)
      .classed('circle', true)
      .text(function (d, i) {
        return d;
      });
  }

  d3.select('button')
    .on('click', onButtonClick);

  // - - - - - - - - - -
}());
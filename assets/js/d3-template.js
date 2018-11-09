/**
 * A Common D3 Template
 * @author Michael
 * @since 2018/11/09
 * @version 1.0.0
 */
!(function () {
  'use strict';
  // - - - - - - - - - -

  // declaration
  let
    svg = undefined,
    canvas = {},
    scale = {},
    xScale = undefined,
    yScale = undefined;

  // configuration (c header style)
  canvas = {
    context: 'main',
    width: 400,
    height: 400,
    viewbox: {
      x: 0,
      y: 0,
      width: 400,
      height: 400
    },
    padding: {
      top: 20,
      right: 40,
      bottom: 40,
      left: 40
    }
  };
  scale = {
    xAxis: {
      domain: {
        from: 0,
        to: 3500000
      },
      range: {
        start: canvas.padding.left,
        end: canvas.width - canvas.padding.right
      }
    },
    yAxis: {
      domain: {
        from: 100,
        to: 0
      },
      range: {
        start: canvas.padding.top,
        end: canvas.height - canvas.padding.bottom
      }
    }
  };


  // methods
  function setCanvas(domContext) {
    svg = d3.select(domContext)
      .append('svg')
      .attr('width', canvas.width)
      .attr('height', canvas.height)
      .attr('viewbox', canvas.viewbox.x + ' ' + canvas.viewbox.y + ' ' + canvas.viewbox.width + ' ' + canvas.viewbox.height)
  }

  function setXScale() {
    xScale = d3.scaleLinear()
      .domain([scale.xAxis.domain.from, scale.xAxis.domain.to]) // Wertebereich der Daten
      .range([scale.xAxis.range.start, scale.xAxis.range.end]) // Zeichnungsbreite
  }

  function setYScale() {
    yScale = d3.scaleLinear()
      .domain([scale.yAxis.domain.from, scale.yAxis.domain.to]) // Wertebereich der Daten
      .range([scale.yAxis.range.start, scale.yAxis.range.end]) // Zeichnungsbreite
  }

  function setXAxis() {
    setXScale();

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (canvas.height - canvas.padding.bottom) + ')')
      .call(d3.axisBottom(xScale)
        .ticks(10, 's'));
  }

  function setYAxis() {
    setYScale();

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + (canvas.padding.left) + ', 0)')
      .call(d3.axisLeft(yScale));
  }

  // control
  setCanvas(canvas.context);
  setXAxis();
  setYAxis();

  // - - - - - - - - - -
}())
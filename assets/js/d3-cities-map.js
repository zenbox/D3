/**
 * Big German Cities
 * @author Michael
 * @since 2018/11/09
 * @version 1.0.0
 */
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
  width: 700,
  height: 700,
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

function drawMap(m) {

  let
    dataset = m || null,
    bounds = undefined,
    projection = undefined,
    scale = undefined,
    geoPath = undefined;

  // loading external data v3
  // d3.json(map, function (mapData){ console.log(mapData) {});

  // loading external data v5
  d3.json(dataset)
    .then(function (dataset) {
      // - - - - - - - - - -
      // console.dir(dataset);

      // looking for boundaries
      bounds = d3.geoBounds(dataset);

      // boundaries
      let
        bottomLeft = bounds[0],
        topRight = bounds[1],
        rotateLongitude = -(topRight[0] + bottomLeft[0]) / 2,
        centerValue = [(topRight[0] + bottomLeft[0]) / 2 + rotateLongitude, (topRight[1] + bottomLeft[1]) / 2];

      // select and configure the map projection
      projection = d3.geoAlbers()
        .parallels([bottomLeft[1], topRight[1]])
        .rotate([rotateLongitude, 0, 0])
        .translate([canvas.width / 2, canvas.height / 2])
        .center(centerValue)
        .scale(5000);

      //   Math.min(canvas.width / (projection(topRight)[0] - projection(bottomLeft)[0])),
      //   canvas.height / (-projection(topRight)[1] + projection(bottomLeft)[1])

      // process the points list for a svg polygon
      geoPath = d3.geoPath()
        .projection(projection);

      // draw map data as svg path
      svg.selectAll()
        .data(dataset['features'])
        .enter()
        .append('path')
        .classed('country', true)
        .attr('d', geoPath)
        .on('mouseenter', onMouseEnter)
        .on('mouseleave', onMouseLeave);


      function onMouseEnter(event) {
        d3.select(this.parentElement)
          .append('text')
          .classed('label', true)
          .attr('transform', 'translate(' + (d3.mouse(this)[0] + 5) + ',' + (d3.mouse(this)[1] + 5) + ')')
          .text(event.properties['NAME_1']);
      }

      function onMouseLeave(event) {
        d3.select(this.parentElement)
          .selectAll('.label')
          .remove();
      }

      // - - - - - - - - - -
    })


}

// control
setCanvas(canvas.context);
// setXAxis();
// setYAxis();

drawMap('assets/data/dataBundesLander.geojson');

// - - - - - - - - - -
}())
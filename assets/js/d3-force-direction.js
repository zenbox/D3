/**
 * A D3 Force Direction Graph
 *
 * @author Michael [michael@zenbox.de]
 * @since 2018/11/09
 * @version v1.0.0
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
    width: 800,
    height: 800,
    viewbox: {
      x: 0,
      y: 0,
      width: 800,
      height: 800
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
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(0,' + (canvas.height - canvas.padding.bottom) + ')')
      .call(d3.axisBottom(xScale)
        .ticks(10, 's'));
  }

  function setYAxis() {

    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', 'translate(' + (canvas.padding.left) + ', 0)')
      .call(d3.axisLeft(yScale));
  }

  function drawForceDirectionGraph(dataset) {


    d3.json(dataset)
      .then(function (dataset) {

        let
          nodes = dataset.nodes,
          links = dataset.links,
          linksBySource = undefined,
          linksCount = undefined,
          forceSimulation = undefined,
          lines = undefined,
          node = undefined,
          group = undefined,
          groupData = undefined;

        function ticked() {
          if (lines) {
            lines
              .attr('x1', function (d, i) {
                return d.source.x;
              })
              .attr('y1', function (d, i) {
                return d.source.y;
              })
              .attr('x2', function (d, i) {
                return d.target.x
              })
              .attr('y2', function (d, i) {
                return d.target.y;
              })
          }
          if (group) {
            group
              .attr('transform', function (d, i) {
                return 'translate(' + d.x + ',' + d.y + ')'
              });
          }
        };

        // sorting or nesting data
        linksBySource = d3.nest()
          .key(function (d, i) {
            return d.source;
          })
          .entries(links);

        // sorting and count links per name and save as object
        linksCount = d3.nest()
          .key(function (d, i) {
            return d.source;
          })
          .rollup(function (v) {
            return v.length;
          })
          .object(links);

        // configure a force direction layout
        forceSimulation = d3.forceSimulation()
          .force('link', d3.forceLink()
            // build links between node-id's
            .id(function (d, i) {
              return d.id;
            }))
          // use many (separate) bodies
          .force('charge', d3.forceManyBody()
            .strength(-100))
          // use the canvas center
          .force('center', d3.forceCenter(canvas.width / 2, canvas.height / 2))

        // - - - - - - - - - -
        // graphics and svg
        // - - - - - - - - - -
        lines = svg.append('g')
          .classed('lines', true)
          .selectAll()
          .data(dataset.links)
          .enter()
          .append('line')
          .attr('stroke-width', function (d, i) {
            let l = d.value;
            l = Math.sqrt(l);
            return l;
          })

        group = svg.selectAll()
          .data(nodes)
          .enter()
          .append('g')
          .classed('nodes', true)
          .append('circle')
          .attr('r', function (d, i) {
            let r = linksCount[d.id];
            r = r + 5;
            return r;
          });

        // - - - - - - - - - -

        // - - - - - - - - - -
        // realtime engine
        // - - - - - - - - - -
        // nodes:
        forceSimulation
          .nodes(nodes)
          .on('tick', ticked);

        // links:
        forceSimulation
          .force('link')
          .links(links);
        // - - - - - - - - - -
      });
  }

  // control
  setCanvas(canvas.context);

  setXScale();
  setYScale();

  // setXAxis();
  // setYAxis();

  drawForceDirectionGraph('assets/data/miserables.json');
  // - - - - - - - - - -
}())
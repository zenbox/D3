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
    options = {};

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
  options = {
    minimumSizeForNodes: 5
  };

  // methods
  function setCanvas(domContext) {
    svg = d3.select(domContext)
      .append('svg')
      .attr('width', canvas.width)
      .attr('height', canvas.height)
      .attr('viewbox', canvas.viewbox.x + ' ' + canvas.viewbox.y + ' ' + canvas.viewbox.width + ' ' + canvas.viewbox.height)
  }

  function drawForceDirectionGraph(dataset) {
    d3.json(dataset)
      .then(function (dataset) {

        // DECLARATION
        let
          nodes = dataset.nodes,
          links = dataset.links,
          color = d3.scaleOrdinal(['hsla(0,0%,15%,0.8)', 'hsla(0,0%,25%,0.8)', 'hsla(0,0%,35%,0.8)', 'hsla(0,0%,45%,0.8)']), //d3.schemeCategory10),
          linksBySource = undefined,
          linksCount = undefined,
          forceSimulation = undefined,
          lines = undefined,
          circles = undefined,
          group = undefined;

        // METHODS
        // - - - - - - - - - -
        // realtime function
        // - - - - - - - - - -
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
          if (circles) {
            circles
              .attr('transform', function (d, i) {
                return 'translate(' + d.x + ',' + d.y + ')'
              });
          }
        };
        // - - - - - - - - - -

        // - - - - - - - - - -
        // dragging functions
        // - - - - - - - - - -
        function dragstarted(d) {
          if (!d3.event.active) forceSimulation.alphaTarget(0.3)
            .restart();
          d.fx = d.x;
          d.fy = d.y;
        }

        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }

        function dragended(d) {
          if (!d3.event.active) forceSimulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }
        // - - - - - - - - - -

        //CONTROL
        // - - - - - - - - - -
        // sorting or nesting data
        // - - - - - - - - - -
        linksBySource = d3.nest()
          .key(function (d, i) {
            return d.source;
          })
          .entries(links);

        // - - - - - - - - - -
        // sorting and count links per name and save as object
        // - - - - - - - - - -
        linksCount = d3.nest()
          .key(function (d, i) {
            return d.source;
          })
          .rollup(function (v) {
            return v.length;
          })
          .object(links);
        // - - - - - - - - - -

        // - - - - - - - - - -
        // configure a force direction layout
        // - - - - - - - - - -
        forceSimulation = d3.forceSimulation()
          .force('link', d3.forceLink()
            // build links between node-id's
            .id(function (d, i) {
              return d.id;
            })
            .distance(10)
          )
          // use many (separate) bodies
          .force('charge', d3.forceManyBody()
            .strength(-100))
          // use the canvas center
          .force('center', d3.forceCenter(canvas.width / 2, canvas.height / 2))
        // - - - - - - - - - -

        // - - - - - - - - - -
        // graphics and svg
        // - - - - - - - - - -
        lines = svg.append('g')
          .classed('lines', true)
          .selectAll()
          .data(links)
          .enter()
          .append('line')
          .attr('stroke-width', function (d, i) {
            let l = d.value;
            l = Math.sqrt(l);
            return l;
          })

        circles = svg.append('g')
          .classed('nodes', true)
          .selectAll()
          .data(nodes)
          .enter()
          .append('g')
          .append('circle')
          .attr('r', function (d, i) {
            let r = linksCount[d.id];
            r = r + options.minimumSizeForNodes;
            return r;
          })
          .attr('style', function (d) {
            return 'fill:' + color(d.group);
          })
          .call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended));;
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
  drawForceDirectionGraph('assets/data/miserables.json');
  // - - - - - - - - - -
}())
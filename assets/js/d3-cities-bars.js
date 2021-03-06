/**
 * Big German Cities
 * @author Michael
 * @since 2018/11/09
 * @version 1.0.0
 */
!(function () {
  'use strict';
  // - - - - - - - - - -

  // declaration
  let
    dataset = [],
    svg = undefined,
    group = undefined,
    canvas = {},
    scale = {},
    xScale = undefined,
    yScale = undefined,
    ordinalScale = undefined;

  // configuration (c header style)
  dataset = [{
      "Stadt": "Berlin",
      "Einwohnerzahl": 3520031,
      "Fläche": "891 km²"
    },
    {
      "Stadt": "Hamburg",
      "Einwohnerzahl": 1787408,
      "Fläche": "755 km²"
    },
    {
      "Stadt": "München",
      "Einwohnerzahl": 1450381,
      "Fläche": "310.4 km²"
    },
    {
      "Stadt": "Köln",
      "Einwohnerzahl": 1060582,
      "Fläche": "405.2 km²"
    },
    {
      "Stadt": "Frankfurt am Main",
      "Einwohnerzahl": 732688,
      "Fläche": "248.3 km²"
    },
    {
      "Stadt": "Stuttgart",
      "Einwohnerzahl": 623738,
      "Fläche": "207.4 km²"
    },
    {
      "Stadt": "Düsseldorf",
      "Einwohnerzahl": 612178,
      "Fläche": "217.4 km²"
    },
    {
      "Stadt": "Dortmund",
      "Einwohnerzahl": 586181,
      "Fläche": "280.4 km²"
    },
    {
      "Stadt": "Essen",
      "Einwohnerzahl": 582624,
      "Fläche": "210.3 km²"
    },
    {
      "Stadt": "Leipzig",
      "Einwohnerzahl": 560472,
      "Fläche": "297.6 km²"
    },
    {
      "Stadt": "Bremen",
      "Einwohnerzahl": 557464,
      "Fläche": "326.7 km²"
    },
    {
      "Stadt": "Dresden",
      "Einwohnerzahl": 543825,
      "Fläche": "328.8 km²"
    },
    {
      "Stadt": "Hannover",
      "Einwohnerzahl": 532163,
      "Fläche": "204 km²"
    },
    {
      "Stadt": "Nürnberg",
      "Einwohnerzahl": 509975,
      "Fläche": "186.5 km²"
    },
    {
      "Stadt": "Duisburg",
      "Einwohnerzahl": 491231,
      "Fläche": "232.8 km²"
    },
    {
      "Stadt": "Bochum",
      "Einwohnerzahl": 364742,
      "Fläche": "145.4 km²"
    },
    {
      "Stadt": "Wuppertal",
      "Einwohnerzahl": 350046,
      "Fläche": "168.4 km²"
    },
    {
      "Stadt": "Bielefeld",
      "Einwohnerzahl": 333090,
      "Fläche": "257.,8 km²"
    },
    {
      "Stadt": "Bonn",
      "Einwohnerzahl": 318809,
      "Fläche": "141.1 km²"
    },
    {
      "Stadt": "Münster",
      "Einwohnerzahl": 310039,
      "Fläche": "302.9 km²"
    }
  ];

  // dataset = [
  //   ["Berlin", 3520031, "891 km²"],
  //   ["Hamburg", 1787408, "755 km²"],
  //   ["München", 1450381, "310.4 km²"],
  //   ["Köln", 1060582, "405.2 km²"],
  //   ["Frankfurt am Main", 732688, "248.3 km²"],
  //   ["Stuttgart", 623738, "207.4 km²"],
  //   ["Düsseldorf", 612178, "217.4 km²"],
  //   ["Dortmund", 586181, "280.4 km²"],
  //   ["Essen", 582624, "210.3 km²"],
  //   ["Leipzig", 560472, "297.6 km²"],
  //   ["Bremen", 557464, "326.7 km²"],
  //   ["Dresden", 543825, "328.8 km²"],
  //   ["Hannover", 532163, "204 km²"],
  //   ["Nürnberg", 509975, "186.5 km²"],
  //   ["Duisburg", 491231, "232.8 km²"],
  //   ["Bochum", 364742, "145.4 km²"],
  //   ["Wuppertal", 350046, "168.4 km²"],
  //   ["Bielefeld", 333090, "257.8 km²"],
  //   ["Bonn", 318809, "141.1 km²"],
  //   ["Münster", 310039, "302.9 km²"]
  // ];

  canvas = {
    context: 'main',
    width: 800,
    height: 600,
    viewbox: {
      x: 0,
      y: 0,
      width: 1600,
      height: 1200
    },
    padding: {
      top: 20,
      right: 100,
      bottom: 40,
      left: 40
    },
    options: {
      defaultMargin: 2
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
        from: 1000,
        to: 0
      },
      range: {
        start: canvas.padding.top,
        end: canvas.height - canvas.padding.bottom
      }
    },
    ordinal: {
      domain: dataset,
      // range: d3.schemePastel1
      range: ['hsla(0,0%,60%,0.8)', 'hsla(0,0%,70%,0.8)', 'hsla(0,0%,80%,0.8)']
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

  function setOrdinalScale() {
    ordinalScale = d3.scaleOrdinal()
      .domain(scale.ordinal.domain)
      .range(scale.ordinal.range);
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

  function drawCitiesAsBars() {
    group = svg.append('g')
      .attr('class', 'cities')
      .selectAll()
      .data(dataset)
      .enter();

    // bar rectangle
    group
      .append('rect')
      .attr('class', 'city')
      .style('fill', function (d, i) {
        return ordinalScale(d['Stadt']);
      })
      .attr('transform', function (d, i) {
        let
          l = dataset.length,
          height = canvas.height - canvas.padding.bottom - canvas.padding.top,
          x = canvas.padding.left,
          y = canvas.padding.top + (i * height / l);

        return 'translate(' + x + ',' + y + ') scale(1) rotate(0)'
      })
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', function (d, i) {
        let width = d['Einwohnerzahl'];
        width = xScale(width);
        return width;
      })
      .attr('height', function (d, i) {
        let h = (canvas.height - canvas.padding.bottom - canvas.padding.top) / dataset.length;
        h = h - canvas.options.defaultMargin;
        return h;
      });

    // bar text label
    // <text>lorem ipsum ...</text>
    group
      .append('text')
      .text(function (d, i) {
        return d['Stadt'];
      })
      .attr('transform', function (d, i) {
        let
          tx = 0,
          ty = 0,
          s = 1,
          r = 0,
          length = dataset.length,
          height = canvas.height - canvas.padding.top - canvas.padding.bottom;

        tx = canvas.padding.left + canvas.options.defaultMargin;
        ty = canvas.padding.top + (i * height / length) + (height / length / 1.5);

        return 'translate(' + tx + ',' + ty + ') scale(' + s + ') rotate(' + r + ')';
      });

  }
  // control
  setCanvas(canvas.context);

  setXScale();
  setYScale();
  setOrdinalScale();

  setXAxis();
  // setYAxis();

  drawCitiesAsBars();
  // - - - - - - - - - -
}())
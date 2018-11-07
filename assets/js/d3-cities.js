!(function () {
  'use strict';
  // - - - - - - - - - -

  // declaration
  let
    dataset = [],
    svg = undefined,
    canvas = {},
    scale = {},
    xScale = undefined,
    yScale = undefined;

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
      "Fläche": "310,4 km²"
    },
    {
      "Stadt": "Köln",
      "Einwohnerzahl": 1060582,
      "Fläche": "405,2 km²"
    }
  ];

  // dataset = [
  //   ["Berlin",  3.520.031, "891 km²"],
  //   ["Hamburg", 1.787.408, "755 km²"],
  //   ["München", 1.450.381, "310,4 km²"],
  //   ["Köln",    1.060.582, "405,2 km²"]
  // ];

  /*
    Stadt	Einwohnerzahl	Fläche
    Berlin	3.520.031	891,8 km²
    Hamburg	1.787.408	755 km²
    München	1.450.381	310,4 km²
    Köln	1.060.582	405,2 km²
    Frankfurt am Main	732.688	248,3 km²
    Stuttgart	623.738	207,4 km²
    Düsseldorf	612.178	217,4 km²
    Dortmund	586.181	280,4 km²
    Essen	582.624	210,3 km²
    Leipzig	560.472	297,6 km²
    Bremen	557.464	326,7 km²
    Dresden	543.825	328,8 km²
    Hannover	532.163	204 km²
    Nürnberg	509.975	186,5 km²
    Duisburg	491.231	232,8 km²
    Bochum	364.742	145,4 km²
    Wuppertal	350.046	168,4 km²
    Bielefeld	333.090	257,8 km²
    Bonn	318.809	141,1 km²
    Münster	310.039	302,9 km²
    */
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
function renderAcceptanceRate(json) {
  nv.addGraph(function() {
    var chart =
      nv.models.lineChart()
                  .margin({left: 100, right:30})
                  .useInteractiveGuideline(true)
                  .showLegend(true)
                  .showYAxis(true)
                  .showXAxis(true)
                  .forceY([0, 100])

    chart.xAxis     //Chart x-axis settings
      .axisLabel('Year')

    chart.yAxis
      .axisLabel('Acceptance Rate(%)')
      .tickFormat(function(v) {
        return d3.format('.1f')(v) + '%';
      })

      .height(500)

    var data = [
      {
        values: json.map(function(d) {
          return {x: d.year, y: d.rate};
        }),
        key: 'Acceptance Rate (%)',
        color: '#ff7f0e'
      }
    ]

    d3.select('#acceptance-rate')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(function() { chart.update()  });
  });
}

function renderAttendance(json) {
  nv.addGraph(function() {
    var chart =
      nv.models.lineChart()
                  .margin({left: 100, right:30})
                  .useInteractiveGuideline(true)
                  .showLegend(true)
                  .showYAxis(true)
                  .showXAxis(true)
                  .forceY([0, 1500])

    chart.xAxis     //Chart x-axis settings
      .axisLabel('Year')

    chart.yAxis
      .axisLabel('Attendance')
      .tickFormat(d3.format(','))
      .height(500)

    var sum = 0;
    json.forEach(function(d){
      sum += d.attendance;
      d.cumulativeAttendance = sum;
    });

    var data = [
      {
        values: json.map(function(d) {
          return {x: d.year, y: d.cumulativeAttendance};
        }),
        key: 'Accumulated Attendance',
        color: '#2ca02c',
        area: true
      },
      {
        values: json.map(function(d) {
          return {x: d.year, y: d.attendance};
        }),
        key: 'Attendance',
        color: '#ff7f0e',
        area: true
      }
    ]

    d3.select('#attendance')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(function() { chart.update()  });
  });
}

function renderPaperCount(json) {
  nv.addGraph(function() {
    var chart =
      nv.models.lineChart()
                  .margin({left: 100, right:30})
                  .useInteractiveGuideline(true)
                  .showLegend(true)
                  .showYAxis(true)
                  .showXAxis(true)
                  .forceY([0, 300])

    chart.xAxis     //Chart x-axis settings
      .axisLabel('Year')

    chart.yAxis
      .axisLabel('# of papers')
      .tickFormat(d3.format(','))
      .height(500)

    var sum = 0;
    json.forEach(function(d){
      sum += d.accepted;
      d.cumulativeAccepted = sum;
    });

    var data = [
      {
        values: json.map(function(d) {
          return {x: d.year, y: d.cumulativeAccepted};
        }),
        key: 'Total presented papers',
        color: '#2ca02c',
        area: true
      },
      {
        values: json.map(function(d) {
          return {x: d.year, y: d.accepted};
        }),
        key: 'Presented papers',
        color: '#ff7f0e',
        area: true
      }
    ]

    d3.select('#paper-count')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(function() { chart.update()  });
  });
}

function renderAuthors(authors){
  nv.addGraph(function() {
      var chart = nv.models.multiBarHorizontalChart()
          .x(function(d) { return d.name  })    //Specify the data accessors.
          .y(function(d) { return d.count  })
          .margin({left: 120, right:30})
          .showValues(true)       //...instead, show the bar value right on top of each bar.
//          .tickFormat(function(d){return d;})
          .valueFormat(function(d){return d;})
          .showControls(false)

    chart.yAxis
      .axisLabel('# of papers')
      .tickFormat(d3.format(','))
      .height(500)

    d3.select('#authors')
      .datum([
        {
          key: '# of papers',
          values: authors
        }
      ])
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;

  });
}

function renderPapers(papers) {
  nv.addGraph(function() {
      var chart = nv.models.multiBarHorizontalChart()
          .x(function(d) { return d.name  })    //Specify the data accessors.
          .y(function(d) { return d.count  })
          .margin({left: 120, right:30})
          .showValues(true)       //...instead, show the bar value right on top of each bar.
//          .tickFormat(function(d){return d;})
          .valueFormat(function(d){return d;})
          .showControls(false)

    chart.yAxis
      .axisLabel('# of papers')
      .tickFormat(d3.format(','))
      .height(500)

    d3.select('#most-cited')
      .datum([
        {
          key: '# of papers',
          values: papers
        }
      ])
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;

  });
}

function renderPapers(papers) {
  nv.addGraph(function() {
      var chart = nv.models.multiBarHorizontalChart()
          .x(function(d) { return d.name.substring(0, 50) + '...'  })    //Specify the data accessors.
          .y(function(d) { return d.count  })
          .margin({left: 300, right:30})
          .showValues(true)       //...instead, show the bar value right on top of each bar.
//          .tickFormat(function(d){return d;})
          .valueFormat(function(d){return d;})
          .showControls(false)

    chart.tooltip.contentGenerator(function(obj) {
      return obj.data.name;
    })


    chart.yAxis
      .axisLabel('# of papers')
      .tickFormat(d3.format(','))
      .height(500)

    d3.select('#most-cited')
      .datum([
        {
          key: '# of papers',
          values: papers
        }
      ])
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;

  });
}

function renderCountries(countries){
  nv.addGraph(function() {
      var chart = nv.models.multiBarHorizontalChart()
          .x(function(d) { return d.name  })    //Specify the data accessors.
          .y(function(d) { return d.count  })
          .margin({left: 120, right:30})
          .showValues(true)       //...instead, show the bar value right on top of each bar.
//          .tickFormat(function(d){return d;})
          .valueFormat(function(d){return d;})
          .showControls(false)

    chart.yAxis
      .axisLabel('# of papers')
      .tickFormat(d3.format(','))
      .height(500)

    d3.select('#countries')
      .datum([
        {
          key: '# of papers',
          values: countries
        }
      ])
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;

  });
}

function renderKeywords(keywords) {
  nv.addGraph(function() {
      var chart = nv.models.multiBarHorizontalChart()
          .x(function(d) { return d.name  })    //Specify the data accessors.
          .y(function(d) { return d.count  })
          .margin({left: 150, right:30})
          .showValues(true)       //...instead, show the bar value right on top of each bar.
//          .tickFormat(function(d){return d;})
          .valueFormat(function(d){return d;})
          .showControls(false)

    chart.yAxis
      .axisLabel('# of papers')
      .tickFormat(d3.format(','))
      .height(500)

    d3.select('#keywords')
      .datum([
        {
          key: '# of papers',
          values: keywords
        }
      ])
      .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;

  });
}

function renderTitleHistogram(data) {
  nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
          .color(function() { return '#1f77b4';})
          .x(function(d) { return d.key })
          .y(function(d) { return d.values.length })
          .showValues(true)
          .valueFormat(d3.format('d'))
          .duration(250);

      chart.xAxis
        .axisLabel('# of words');

      chart.yAxis
        .axisLabel('# of papers')
        .tickFormat(d3.format('d'));

      chart.tooltip.contentGenerator(function(obj) {
        let pubs = obj.data.values.map(d => '<li>' + d['Title'] + '</li>').join('');
        return '<h4 style="margin-left:1em;">' + obj.data.values.length + ' Papers</h4>' + '<ul style="margin-right:2em;">' + pubs + '</ul>';
      });

      let nest = d3.nest()
        .key(function(d) { return d['words in title']; })
        .sortKeys(function(a, b) { return a * 1 - b * 1})
        .sortValues(function(a, b) { return d3.ascending(a['Title'], b['Title']); });

      d3.select('#titleHisto')
          .datum([{
            key: 'titleHisto',
            values: nest.entries(data)
          }])
          .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
  });
}

function renderAuthorHistogram(data) {
  nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
          .color(function() { return '#1f77b4';})
          .x(function(d) { return d.key })
          .y(function(d) { return d.values.length })
          .showValues(true)
          .valueFormat(d3.format('d'))
          .duration(250);

      chart.xAxis
        .axisLabel('# of authors');

      chart.yAxis
        .axisLabel('# of papers')
        .tickFormat(d3.format('d'));

      chart.tooltip.contentGenerator(function(obj) {
          let authors = _.uniq(obj.data.values.map(d => d['Author']).join(';').split(';'));
          return '<div style="margin:10px"><strong>' + obj.data.values.length + '</strong> Papers & <strong>' + authors.length + '</strong> Authors</div>';
      })

      let nest = d3.nest()
        .key(function(d) { return d['# of authors']; })
        .sortKeys(function(a, b) { return a * 1 - b * 1});

      d3.select('#authorHisto')
          .datum([{
            key: 'authorHisto',
            values: nest.entries(data)
          }])
          .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
  });
}

function renderFigureHistogram(data) {
  nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
          .color(function() { return '#1f77b4';})
          .x(function(d) { return d.key })
          .y(function(d) { return d.values.length })
          .showValues(true)
          .valueFormat(d3.format('d'))
          .duration(250);

      chart.xAxis
        .axisLabel('# of Figures');

      chart.yAxis
        .axisLabel('# of papers')
        .tickFormat(d3.format('d'));

      chart.tooltip.contentGenerator(function(obj) {
        let pubs = obj.data.values.map(d => '<li>' + d['Title'] + '</li>').join('');
        return '<h4 style="margin-left:1em;">' + obj.data.values.length + ' Papers</h4>' + '<ul style="margin-right:2em;">' + pubs + '</ul>';
      });

      let nest = d3.nest()
        .key(function(d) { return d['figure_num']; })
        .sortKeys(function(a, b) { return a * 1 - b * 1});

      d3.select('#figureHisto')
          .datum([{
            key: '# of Figures',
            values: nest.entries(data)
          }])
          .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
  });
}

function renderTableHistogram(data) {
  nv.addGraph(function() {
      var chart = nv.models.discreteBarChart()
          .color(function() { return '#1f77b4';})
          .x(function(d) { return d.key })
          .y(function(d) { return d.values.length })
          .showValues(true)
          .valueFormat(d3.format('d'))
          .duration(250);

      chart.xAxis
        .axisLabel('# of Tables');

      chart.yAxis
        .axisLabel('# of papers')
        .tickFormat(d3.format('d'));

      chart.tooltip.contentGenerator(function(obj) {
        let pubs = obj.data.values.map(d => '<li>' + d['Title'] + '</li>').join('');
        return '<h4 style="margin-left:1em;">' + obj.data.values.length + ' Papers</h4>' + '<ul style="margin-right:2em;">' + pubs + '</ul>';
      });

      let nest = d3.nest()
        .key(function(d) { return d['table_num']; })
        .sortKeys(function(a, b) { return a * 1 - b * 1});

      d3.select('#tableHisto')
          .datum([{
            key: '# of Tables',
            values: nest.entries(data)
          }])
          .call(chart);
      nv.utils.windowResize(chart.update);
      return chart;
  });
}

function renderWordcloud(data) {
  console.log(data);
  var max = d3.max(data, d => d.count);
  var sizeScale = d3.scale.linear()
    .domain([1, max])
    .range([5, 100]);

  var width = 900, height = 350;
  var fill = d3.scale.category20();
  var layout = d3.layout.cloud()
      .size([width, height])
      .words(data)
      .padding(3)
      .rotate(function(d) { return 0; })
      .text(function(d) { return d.text; })
      .font("Sans-serif")
      .fontWeight("bold")
      .fontSize(function(d) { return sizeScale(Math.pow(d.count, 2)); })
      .on("end", function(words) {
          d3.select("#keywordWordcloud")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
          .selectAll("text")
            .data(words, d => d.text)
          .enter().append("text")
            .attr("fill", function(d, i) { return fill(i); })
            .style("font-size", function(d) { return d.size + "px"; })
            .style("font-weight", "bold")
            .style("font-family", "Sans-serif")
            .style("user-select", "none")
            .attr("text-anchor", "middle")
            .attr("transform", function(d) {
              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function(d) { return d.text; });
      });

      layout.start();
}

function renderAuthorGraph(data) {
  var tip = d3.tip().attr('class', 'd3-tip')
    .direction('e')
    .offset([0, 80])
    .html(d => {
      var header = '<p class="graph-node-author">' + d.id + '</p>'
      var abstract = '<p class="graph-node-desc">' + d.count + ' Papers</p>';
      var list = links.filter(link => d === link.source || d === link.target);
      list = '<ul class="graph-node-coauthor-list">' + list.map(link => {
        return '<li>' + (d === link.source ? link.target.id : link.source.id) + '</li>';
      }).join('') + '</ul>';

      return header + abstract + list;
    });

  var nodes = data.nodes.sort((a, b) => b.count - a.count).slice(0, 100);
  var authorDict = _.fromPairs(nodes.map(d => [d.id, d.count]));
  var links = data.links
                .filter(d => _.has(authorDict, d.source) && _.has(authorDict, d.target))
                .map(d => {
                  return {
                    count: d.count,
                    source: _.findIndex(nodes, {'id': d.source}),
                    target: _.findIndex(nodes, {'id': d.target}),
                  }
                });

  var svg = d3.select("#authorGraph"),
      width = parseFloat(svg.style("width")),
      height = parseFloat(svg.style("height"));

  var k = Math.sqrt(nodes.length / (width * height));

  var force = d3.layout.force()
      //.gravity(0.05)
      //.distance(40)
      //.charge(-100)
      .charge(-10 / k)
      .gravity(100 * k)
      .size([width - 20, height - 20])
      .nodes(nodes)
      .links(links)
      .start();

  var g = svg.append('g')
    .attr('transform', 'translate(10, 10)');

  var link = g.append("g")
    .attr("class", "links")
   .selectAll("line")
    .data(links)
  .enter().append("line")
    .attr('opacity', 0)
    .attr("stroke", 'grey')
    .attr("stroke-width", function(d) { return Math.sqrt(d.count); });

  var rScale = d3.scale.sqrt()
    .domain([1, d3.max(nodes, function(d) {return d.count;})])
    .range([2, 10])

  var color = d3.scale.linear()
    .domain(rScale.domain())
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb('#1a84ed'), d3.rgb('#27337f')]);

  var node = g.append("g")
    .attr("class", "nodes")
  .selectAll("circle")
    .data(nodes)
  .enter().append("circle")
    .attr('opacity', 0)
    .attr("r", function(d){ return rScale(d.count) })
    .attr("fill", function(d) { return color(d.count); })
    .on('mouseover', function(d) {
      node.attr('opacity', 0.3);
      link.attr('opacity', 0.3);

      var myLinks = link.filter(link => d === link.source || d === link.target);
      myLinks.attr('opacity', 1);

      var neighbors = myLinks.data().map(n => d === n.target ? n.source : n.target);
      var neighborDict = _.fromPairs(neighbors.map(n => [n.id, 1]));
      node.filter(n => _.has(neighborDict, n.id)).attr('opacity', 1);
      d3.select(this).attr('opacity', 1);

      tip.show(d);
    })
    .on('mouseout', function(d) {
      tip.hide();

      node.attr('opacity', 1);
      link.attr('opacity', 1);
    });
    //.call(force.drag);

    g.select('g.nodes').call(tip);

  var nodeAnimate = false,
      linkAnimate = false;
  var tickCount = 0;
  force.on("tick", function() {
      if (!nodeAnimate && force.alpha() < 0.1) {
        node.transition().duration(750)
          .attr('opacity', 1);
          nodeAnimate = true;
      }
      if (!linkAnimate && force.alpha() < 0.05) {
        link.transition().duration(750)
          .attr('opacity', 1);
          linkAnimate = true;
      }

      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      tickCount++;
      if (tickCount > 150) {
        force.stop();
      }
  });
}

function renderConferences(data) {
    var svg = d3.select("#conferenceMap")
      width = parseFloat(svg.style("width")),
      height = parseFloat(svg.style("height"));

    var projection = d3.geo.mercator()
        .center([-60, 5])
        .scale(300)
        .rotate([-180,0]);
    var path = d3.geo.path()
        .projection(projection);

    var topo_layer = svg.append("g"),
        path_layer = svg.append("g"),
        symbol_layer = svg.append("g");

    d3.json("world-110m2.json", function(error, topology) {
        topo_layer.selectAll("path")
          .data(topojson.object(topology, topology.objects.countries).geometries)
        .enter().append("path")
          .attr("d", path);

        var cities = symbol_layer.selectAll("g")
          .data(data).enter().append('g')
          .attr('class', 'city')
          .attr('opacity', 0)
          .attr('transform', d => 'translate(' + projection([d.longitude, d.latitude]) + ')');

        cities.append("circle")
          .attr("cx", 0)
          .attr("cy", 0)
          .attr("r", 2)
          .attr("fill", "#f44336");

        cities.append('text')
          .attr('x', 0)
          .attr('y', -15)
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'central')
          .attr('font-size', "1em")
          .attr('fill', "black")
          .style('font-family', "Helvetica Neue, Helvetica, Arial, sans-serif")
          .text(d => d.year);

        cities.append('text')
          .attr('x', 0)
          .attr('y', -35)
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'central')
          .attr('font-size', "1em")
          .attr('fill', "black")
          .style('font-family', "Helvetica Neue, Helvetica, Arial, sans-serif")
          .text(d => d.location);

        var lineData = _.map(_.tail(data), (d, i) => {
          var start = projection([data[i].longitude, data[i].latitude]),
              end = projection([d.longitude, d.latitude]);
          return {
            year: data[i].year,
            x1: start[0],
            y1: start[1],
            x2: end[0],
            y2: end[1],
          };
        });

        path_layer.selectAll('line')
          .data(lineData)
        .enter().append('line')
          .attr('opacity', 0)
          .attr("x1", d => d.x1)
          .attr("y1", d => d.y1)
          .attr("x2", d => d.x1)
          .attr("y2", d => d.y1)
          //.attr('stroke', "url(#gradLine2)");
          .attr('stroke', "black")
          .attr('stroke-width', 2);

        function animation() {
          cities.each(function(d, i) {
              path_layer.selectAll('line')
                  .filter(n => n.year === d.year)
                .attr('opacity', 1)
                .transition().delay((i+1) * 2000).duration(1000)
                .attr('x2', n => n.x2)
                .attr('y2', n => n.y2)
                .transition().duration(500)
                .attr('opacity', 0);

              d3.select(this)
                .attr('opacity', 0)
              .transition().delay(i * 2000).duration(1000)
                .attr('opacity', 1);

              d3.select(this)
                .selectAll('text')
                .attr('opacity', 1)
              .transition().delay((i+1) * 2000).duration(1000)
                .attr('opacity', i === cities.size() - 1 ? 1 : 0);

              d3.select(this)
                .select('circle')
                .attr("r", 2)
              .transition().delay(i * 2000).duration(500)
                .attr("r", 8)
              .transition().duration(500)
                .attr("r", 4);

              d3.select(this)
                .select('circle')
                .attr("fill", "#f44336")
                .transition().delay((i+1) * 2000).duration(1000)
                .attr("fill", i === cities.size() - 1 ? "#f44336" : "#303f9f")
                .each("end", function() {
                  if (i === cities.size() - 1) {
                    cities.attr('opacity', 0);
                    cities.select('circle')
                      .attr("r", 2)
                      .attr("fill", "#f44336");

                    cities.selectAll('text')
                      .attr('opacity', 1);

                    path_layer.selectAll('line')
                      .attr('opacity', 0)
                      .attr("x2", d => d.x1)
                      .attr("y2", d => d.y1);

                    animation();
                  }
                });
          });
        }

        animation();
    });
/*
    var zoom = d3.behavior.zoom()
        .on("zoom",function() {
            g.attr("transform","translate("+ d3.event.translate.join(",")+")scale("+d3.event.scale+")");
            g.selectAll("circle")
                .attr("d", path.projection(projection));
            g.selectAll("path")
                .attr("d", path.projection(projection));
      });
    svg.call(zoom);
    */
}

$(function() {
  $('[data-toggle="tooltip"]').tooltip()

  d3.json('metadata.json', function(json) {
    renderAcceptanceRate(json.conferences)
    renderAttendance(json.conferences)
    renderPaperCount(json.conferences)
    renderAuthors(json.authors)
    renderCountries(json.countries)
    renderPapers(json.papers)
    renderKeywords(json.keywords)
    renderConferences(json.conferences);
  });

  d3.csv('final_merged.csv', function(csv) {
    renderTitleHistogram(csv);
    renderAuthorHistogram(csv);
    renderFigureHistogram(csv);
    renderTableHistogram(csv);
  });
/*
  d3.json('wordcount.json', function(json) {
    renderWordcloud(json.keyword.sort((a, b) => b.count - a.count));
  })
*/

  d3.json('graph.json', function(json) {
    renderAuthorGraph(json);
  })
})

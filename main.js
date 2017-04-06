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

    w = chart;
    console.log(chart)

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

    w = chart;
    console.log(chart)

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

    w = chart;
    console.log(chart)

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

$(function() {
  d3.json('metadata.json', function(json) {
    renderAcceptanceRate(json)
    renderAttendance(json)
    renderPaperCount(json)
  });
})

import React from 'react'
var dps = [
  {x: 1, y: 10},
  {x: 2, y: 13},
  {x: 3, y: 18},
  {x: 4, y: 20},
  {x: 5, y: 17},
  {x: 6, y: 10},
  {x: 7, y: 13},
  {x: 8, y: 18},
  {x: 9, y: 20},
  {x: 10, y: 17}
] //dataPoints.
var xVal = dps.length + 1
var yVal = 15
const updateInterval = 1000

class NewChart extends React.Component {
  componentDidMount() {
    var chart = new CanvasJS.Chart('chartContainer', {
      // animationEnabled: true,
      // theme: "light2",
      title: {
        text: 'CanvasJS Line Chart in React & Webpack'
      },
      data: [
        {
          type: 'line',
          dataPoints: dps
        }
      ]
    })
    chart.render()
  }
  render() {
    return (
      <div id="chartContainer" style={{height: 400 + 'px', width: 100 + '%'}} />
    )
  }
}

export default NewChart

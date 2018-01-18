import React from 'react'
import { XYPlot, XAxis, YAxis, HeatmapSeries } from 'react-vis'

const myData = [
    {x: 1, y: 0, color: 10},
    {x: 1, y: 5, color: 10},
    {x: 1, y: 10, color: 6},
    {x: 1, y: 15, color: 7},
    {x: 2, y: 0, color: 12},
    {x: 2, y: 5, color: 2},
    {x: 2, y: 10, color: 1},
    {x: 2, y: 15, color: 12},
    {x: 3, y: 0, color: 9},
    {x: 3, y: 5, color: 2},
    {x: 3, y: 10, color: 6},
    {x: 3, y: 15, color: 12}
  ]
  

const Heatmap = () => {
    return (
    <XYPlot
        width={300}
        height={300}>
    <XAxis />
    <YAxis />
    <HeatmapSeries
        className="heatmap-series-example"
        data={myData}/>
    </XYPlot>
    )
}

export default Heatmap
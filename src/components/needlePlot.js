import React from 'react'
import { mutsNeedlePlot } from '../const'
import muts from './data/muts.json'
import regions from './data/regions.json'

const colorMap = {
    // mutation categories
    "missense_variant": "yellow",
    "frameshift_variant": "blue",
    "stop_gained": "red",
    "stop_lost": "orange",
    "synonymous_variant": "lightblue",
    // regions
    "X-binding": "olive",
    "region1": "olive"
};

const legends = {
    x: "Corresponding protein positions to transcript X",
    y: "Number of recorded mutation"
};

//Crate config Object
const plotConfig = {
    maxCoord: 250,
    minCoord: 0,
    targetElement: "yourDiv",
    mutationData: muts,
    regionData: regions,
    colorMap: colorMap,
    legends: legends
};



export default class NeedlePlot extends React.Component {
    componentDidMount() {
        const instance = new mutsNeedlePlot(plotConfig);
    }
    render() {
        return <div id ="yourDiv"/ >
    }
}
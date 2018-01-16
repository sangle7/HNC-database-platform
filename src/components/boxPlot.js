import Plotly from 'plotly.js';

const BoxPlot = () => {
    for (var i = 0; i < 50; i ++) {
        y0[i] = Math.random();
        y1[i] = Math.random() + 1;
    }
    
    var trace1 = {
      y: y0,
      type: 'box'
    };
    
    var trace2 = {
      y: y1,
      type: 'box'
    };
    
    var data = [trace1, trace2];

    const el = document.createElement('div')
    el.setAttribute ('id','myDiv')
    Plotly.newPlot('myDiv', data);
    el.setAttribute ('id')
}

export default BoxPlot

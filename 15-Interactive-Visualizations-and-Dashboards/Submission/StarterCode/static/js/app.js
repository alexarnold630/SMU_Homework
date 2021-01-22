$(document).ready(function(){
    doWork();
});

function doWork() {
    d3.json("samples.json").then(function(data) {
        console.log(data);

      //populate dropdown
      data.names.forEach(function(val) {
        var newOption = `<option>${val}</option>`;
        $('#selDataset').append(newOption);
      });

      //grab first name in dropdown

      //filter the matadata

      //build that div


    makeBarChart(data);
    makeBubbleChart(data);
    makeGaugeChart(data);
    });
}

function makeBarChart(data) {

  var trace1 = {
    x: data.samples[0].sample_values.slice(0,10),
    y: data.samples[0].otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`).reverse(),
    orientation: 'h',
    marker: {
      color: 'rgb(158,202,225)',
      opacity: 0.6,
      line: {
        color: 'rgb(8,48,107)',
        width: 1.5
      }
    },
    type: 'bar',
    text: data.samples[0].otu_labels.map(String),
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Top 10 OTUs',
  };
  
  Plotly.newPlot('bar', data, layout);
}

function makeBubbleChart (data) {
  var trace1 = {
    x: data.samples[0].otu_ids,
    y: data.samples[0].sample_values,
    text: data.samples[0].otu_labels.map(String),
    mode: 'markers',
    marker: {
      color: data.samples[0].otu_ids,
      opacity: [1, 0.8, 0.6, 0.4],
      size: data.samples[0].sample_values
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Each Sample Bubble Chart',
    showlegend: false,
    height: 600,
    width: 1000,
    xaxis: {
      title: {
        text:'OTU ID',
      }}};
  
  Plotly.newPlot('bubble', data, layout);
}

function makeGaugeChart(data) {
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: 270,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number"
    }
  ];
  
  var layout = { 
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 },
  };

  Plotly.newPlot('gauge', data, layout);
}




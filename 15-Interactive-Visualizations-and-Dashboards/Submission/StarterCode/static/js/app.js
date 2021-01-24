$(document).ready(function(){
    doWork();
    //Event Listener
});

function doWork() {
    d3.json("samples.json").then(function(data) {
        console.log(data);
        makePanel();
        makePlots();
})}


function makePlots(data) {
  //add in each chart
  makeBarChart(data);
  makeBubbleChart(data);
  makeGaugeChart(data);
}

function makePanel(data){
  //populate dropdown
    data.names.forEach(function(val) {
      var newOption = `<option>${val}</option>`;
      $('#selDataset').append(newOption);
    });

    //grab first name in dropdown
    var sample = parseInt($('#selDataset').val());

    //filter the matadata
    var metadata = data.metadata.filter(x => x.id === sample)[0]; //strict euqality also checking value type

    //build that div
    Object.entries(metadata).forEach(function(key_value, index){
      var entry = `<span><b>${key_value[0]}: </b> ${key_value[1]}</span><br>`;
      $("#sample-metadata").append(entry);
    })
}

function makeBarChart(data) {

  var trace1 = {
    x: data.samples[0].sample_values.slice(0,10).reverse(),
    y: data.samples[0].otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`),
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
    //text: data.samples[0].otu_labels.map(String),
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Top 10 OTUs',
    //xaxis: {title: "Amount of Bacteria- FIND UNIT"},
    //yaxis: {title: "Bacteria ID"}
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
  var trace = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: data.metadata[0].wfreq,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      gauge: {
        axis: {range: [null, 10]},
        steps: [
          {range: [0,7], color: "lightgray"},
          {range: [7,10], color: "gray"}
        ],
        threshold: {
          line: {color: "read", width: 4},
          thickness: 0.75,
          value: 2
        }
      },
      mode: "gauge+number"
    }
  ];

  var data = [trace];
  
  var layout = { 
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 },
  };

  Plotly.newPlot('gauge', data, layout);
}




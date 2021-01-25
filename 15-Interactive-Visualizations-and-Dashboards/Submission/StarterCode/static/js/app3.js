var all_data = [];

$(document).ready(function(){
    doWork();

    //Event Listener
    $('#selDataset').change(function() {
      doWork();
  });
});

function doWork() {
  d3.json("samples.json").then(function(data) {
    all_data = data;
    //console.log(data);
    //makeBarChart(data);
    //makeBubbleChart(data);
    //makeGaugeChart(data);
    //makePanel(data);
    //makePlots(data);
    //doWork(data);

  // grab subject id in dropdown
  var sample = parseInt($("#selDataset").val());

  // filter the metadata
  var metadata = all_data.metadata.filter(x => x.id === sample)[0];

  // filter the sample data 
  var sample_data = all_data.samples.filter(x => x.id == sample)[0];

  // build the charts
  makeFilters(data);
  makePanel(metadata);
  makePlots(sample_data, metadata);

})}

function makeFilters(data) {
  // populate the dropdown
  data.names.forEach(function(val) {
    var newOption = `<option>${val}</option>`;
    $('#selDataset').append(newOption);
  });
}

function makePanel(metadata){
  //wipe the panel
  $("#sample-metadata").empty();

  //grab subject ID
  var sample = parseInt($('#selDataset').val());

  //filter the matadata
  var metadata = data.metadata.filter(x => x.id === sample)[0]; 

  // build that div
  Object.entries(metadata).forEach(function(key_value, index) {
    var entry = `<span><b>${key_value[0]}:</b> ${key_value[1]}</span><br>`;
    $("#sample-metadata").append(entry);
  });
}

function makePlots(data) {
  $('#plots').show();

  makeBarChart(data);
  makeBubbleChart(data);
  makeGaugeChart(data);
}

function makeBarChart(data) {

  var trace1 = {
    x: data.samples[0].sample_values.slice(0,10).reverse(),
    y: data.samples[0].otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`),
    orientation: 'h',
    marker: {
      color: 'rgb(217, 35, 15)',
      opacity: 0.6,
      line: {
        color: 'rgb(139, 0, 0)',
        width: 1.5
      }
    },
    type: 'bar',
    //text: data.samples[0].otu_labels.map(String),
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Top 10 OTUs',
    xaxis: {title: "Amount of Bacteria Present (No. of Reads)"},
    yaxis: {title: "Bacteria (OTU) ID"}
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
    title: 'Total Number and Amount of Bacteria Species Found Per Individual',
    showlegend: false,
    height: 600,
    width: 1000,
    yaxis: {title: "Amount of Bacteria Present (No. of Reads)"},
    xaxis: {
      title: {
        text:'OTU ID',
      }}};
  
  Plotly.newPlot('bubble', data, layout);
}

function makeGaugeChart(data) {
  //var setMax = d3.max(Array.from(mySet.values()));
  //var max_freq = d3.max(Array.from((data.metadata[0].wfreq).values()));
  var max_wfreq = Math.max.apply(Math, [data.metadata[0].wfreq].map(function(x) { return x.wfreq; }))
  //var max_wfreq = Math.max(data.metadata.map(x => +x.wfreq).filter(x => (x) | x == 0));
  //var max_wfreq = 10;

  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: data.metadata[0].wfreq,
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, max_wfreq], tickwidth: 1, tickcolor: "#d9230f" },
        bar: { color: "#d9230f" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        // steps: [
        //   { range: [0, 250], color: "cyan" },
        //   { range: [250, 400], color: "royalblue" }
        // ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 490
        }
      }
    }
  ];
  
  var layout = { 
    width: 600, 
    height: 500, 
    margin: { t: 0, b: 0 } 
  };
  
  Plotly.newPlot('gauge', data, layout);
}


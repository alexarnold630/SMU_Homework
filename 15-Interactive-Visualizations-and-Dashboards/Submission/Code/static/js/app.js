var study_data = [];

$(document).ready(function(){
    onInit();

    //Event Listener
    $('#selDataset').change(function() {
        displaySubject();
    });
});

//Initialize
function onInit() {
    d3.json("samples.json").then(function(data) {
        console.log(data);
        // save data
        study_data = data;
        //build
        makeFilters(data);
        displaySubject();
})}

//Launch with Subject ID Change
function displaySubject() {
    // grab name (subject ID)
    var subject = parseInt($("#selDataset").val());

    // filter the metadata
    var metadata = study_data.metadata.filter(x => x.id === subject)[0];

    // filter the sample data 
    var sample_data = study_data.samples.filter(x => x.id == subject)[0];

    //build
    makeDemoInfo(metadata);
    makeCharts(sample_data, metadata);
}

function makeFilters(data){
    // populate dropdown
    data.names.forEach(function(val) {
        var newOption = `<option>${val}</option>`;
        $('#selDataset').append(newOption);
    });
}

function makeDemoInfo(metadata) {
    //wipe the demo info
    $("#sample-metadata").empty();

    // build
    Object.entries(metadata).forEach(function(key_value, index) {
        var entry = `<span><b>${key_value[0]}:</b> ${key_value[1]}</span><br>`;
        $("#sample-metadata").append(entry);
    });
}

function makeCharts(sample_data, metadata) {
    makeBarChart(sample_data);
    makeBubbleChart(sample_data);
    makeGaugeChart(metadata);
}

function makeBarChart(sample_data) {

    var trace1 = {
        x: sample_data.sample_values.slice(0,10).reverse(),
        y: sample_data.otu_ids.slice(0,10).reverse().map(otuID => `OTU ${otuID}`),
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
        text: sample_data.otu_labels.map(String),
    };

    var data = [trace1];

    var layout = {
        title: '<b>Top 10 OTUs<b>',
        xaxis: {title: "Amount of Bacteria Present (No. of Reads)"},
        yaxis: {title: "Bacteria (OTU) ID"}
    };

    Plotly.newPlot('bar', data, layout);
}
  
function makeBubbleChart(sample_data) {
    var trace1 = {
        x: sample_data.otu_ids,
        y: sample_data.sample_values,
        text: sample_data.otu_labels.map(String),
        mode: 'markers',
        marker: {
        color: sample_data.otu_ids,
        opacity: [1, 0.8, 0.6, 0.4],
        size: sample_data.sample_values
        }
    };

    var data = [trace1];

    var layout = {
        title: '<b>Total Number and Amount of Bacteria Species<b>',
        showlegend: false,
        height: 600,
        width: 1000,
        yaxis: {title: "Amount of Bacteria Present (No. of Reads)"},
        xaxis: {title: "OTU ID"}
    };

    Plotly.newPlot('bubble', data, layout);
}
  
function makeGaugeChart(metadata) {
    //var setMax = d3.max(Array.from(mySet.values()));
    //var max_freq = d3.max(Array.from((data.metadata[0].wfreq).values()));
    //var max_wfreq = Math.max.apply(Math, [metadata.wfreq].map(function(x) { return x.wfreq; }))
    //var max_wfreq = Math.max(data.metadata.map(x => +x.wfreq).filter(x => (x) | x == 0));
    var max_wfreq = 10;

    var data = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: metadata.wfreq,
        title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, max_wfreq]},
            bar: { color: "#d9230f" },
            bgcolor: "white",
            borderwidth: 2,
            bordercolor: "gray",
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: metadata.wfreq
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
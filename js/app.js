// Create a Scatter Plot between poverty and access to healthcare

// Establish svg containers
var svgHeight = 500;
var svgWidth = 900;

// Create the margins of the graph
var margin = {top: 20,right: 40,bottom: 80,left: 100};

var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Create svg container
var svg = d3.select("#scatter").append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

// Formatting shift
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load the data from data.csv file
d3.csv("/data/data.csv").then(function(censusData) {
    
    // Log the data to ensure it is loading
    console.log(censusData);

    // Parse the data
    censusData.forEach(function(data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
    });

    // Create the scales and axis from the dataset
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d.poverty) - 1, d3.max(censusData, d => d.poverty) + 1])
        .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(censusData, d => d.healthcare) - 1, d3.max(censusData, d => d.healthcare)+1])
        .range([chartHeight, 0]);

    // Create x and y axis
    var xAxis = d3.axisBottom(xLinearScale);
    var yAxis = d3.axisLeft(yLinearScale);

});

    
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
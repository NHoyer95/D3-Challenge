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

    // Append x and y axis to the chart
    chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

    chartGroup.append("g")
        .call(yAxis);

    // Create the markers from the poverty and healthcare data points
    var dataPoints = chartGroup.selectAll("circle")
        .data(censusData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 15)
        .attr("fill", "green")
        .attr("opacity", ".25")
        .attr("stroke", "black")

    // Create the labels for each state
    var labels = chartGroup.select("g")
        .selectAll("circle")
        .data(censusData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("dy",-395)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("text-anchor", "middle")
        .attr("font-size", "12px")
        .attr("fill", "black");

    // Create label for the x axis
    var xLabel = chartGroup.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("font-weight", 500)
        .attr("x", svgWidth/2)
        .attr("y", chartHeight + 50)
        .text("In Poverty (%)");

    // Create label for the y axis
    var yLabel = chartGroup.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("font-weight", 500)
        .attr("x", -130)
        .attr("y", -50)
        .attr("transform", "rotate(-90)")
        .text("Lacks Healthcare (%)");

});

    
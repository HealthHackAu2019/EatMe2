var lineData = [{"Y": 10, "X": 10}, {"Y": 100, "X": 100}];

var linePathGenerator = d3.svg.line()
    .x(function(d) { return d.X; })
    .y(function(d) { return d.Y; })
    .interpolate("linear");

//check to see if SVG Path Mini-Language Instructions are generated
linePathGenerator(lineData);

var svgContainer = d3.select("body")
  .append("svg")
    .attr("width", "800")
    .attr("height", "800");
    svgContainer.append("image")
     .attr("xlink:href", "https://www.gravatar.com/avatar/145d1d785af3ea2bf9f803cc08c2413a?s=80");


var svgPath = svgContainer
  .append("path")
    .attr("stroke", "blue")
    .attr("stroke-width", "4px")
    .attr("fill", "none");

svgPath.attr("d", linePathGenerator(lineData));
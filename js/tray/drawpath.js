/**
 * https://jsfiddle.net/GunnerSS/7fvtcLrw/
 */
function drawPath(svgContainer, lineData)
{
    var linePathGenerator = d3.line()
        .x(function(d) { return d[0]; })
        .y(function(d) { return d[1]; });

    //check to see if SVG Path Mini-Language Instructions are generated
    linePathGenerator(lineData);

    var svgPath = svgContainer
        .append("path")
        .attr("stroke", "blue")
        .attr("stroke-width", "4px")
        .attr("fill", "none");

    svgPath.attr("d", linePathGenerator(lineData));
}

/**
 * https://jsfiddle.net/GunnerSS/7fvtcLrw/
 */
function drawPath(svgContainer, lineData)
{
    var linePathGenerator = d3.line()
        .x(function(d) { return d[0]; })
        .y(function(d) { return d[1]; })
        .curve(d3.curveLinear);

    //check to see if SVG Path Mini-Language Instructions are generated
    linePathGenerator(lineData);

    var svgPath = svgContainer
        .append("path")
        .attr("stroke", "red")
        .attr("stroke-width", "2px")
        .attr("fill-opacity", ".4")
        .attr("fill", "red");

    svgPath.attr("d", linePathGenerator(lineData));

    // BTW: d3 can compute area too

}

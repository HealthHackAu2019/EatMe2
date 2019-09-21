function main() {

    var svgContainer = d3.select("#workspace")
        .append("svg")
        .attr("width", "800")
        .attr("height", "800");
    svgContainer.append("image")
        .attr("xlink:href", "https://www.gravatar.com/avatar/145d1d785af3ea2bf9f803cc08c2413a?s=80");

    console.log(jsonSample);

    var pathData = jsonSample.items[0].polygon;
    console.log(pathData);
    drawPath(svgContainer, pathData);
}


function main() {

    var imgUrl = 'data/img/001.png';

    var svgContainer = d3.select("#workspace")
        .append("svg")
        .attr("width", "1280")
        .attr("height", "900");
    svgContainer.append("image")
        .attr("xlink:href", imgUrl);

    console.log(jsonSample);

    var pathData = jsonSample.items[0].polygon;
    console.log(pathData);
    drawPath(svgContainer, pathData);
}


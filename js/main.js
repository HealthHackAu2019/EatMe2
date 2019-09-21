function main(el, tray_id) {

    var imgUrl = 'data/img/' + tray_id + '.png';

    var svg = d3.select(el)
        .append("svg")
        .attr("width", "1280")
        .attr("height", "900");
    svg.append("image")
        .attr("xlink:href", imgUrl);

    console.log(jsonSample);

    var pathData = jsonSample.items[ +tray_id ].path;
    console.log(pathData);
    drawPath(svg, pathData, 'red');



    // draw BBOX
    var bb = jsonSample.bbox;
    svg.append("rect")
        .attr("stroke", "white")
        .attr("stroke-width", "2px")
        .attr("fill", "none")
        .attr("x", bb.x)
        .attr("y", bb.y)
        .attr("width", bb.w)
        .attr("height", bb.h);
}


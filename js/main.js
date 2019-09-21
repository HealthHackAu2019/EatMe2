function main(el, tray_id) {

    var imgUrl = 'data/img/' + tray_id + '.png';
    var trayData = window['tray_' + tray_id];

    // bounding box of tray
    var bb = trayData.bbox;

    // svg size
    var svgW = 400;
    var svgH = 300;

    // orig pic size
    var origW = 1224;
    var origH = 946;

    var svg = d3.select(el)
        .append("svg")
        .style('border', 'black solid')
        .attr("width", svgW)
        .attr("height", svgH);

    // transform so tray fills the SVG
    var scale = Math.min(svgW / bb.w, svgH / bb.h); // TODO correct??
    var dx = -bb.x * scale;
    var dy = -bb.y * scale;

    console.log('Resize by: ' + scale);

    svg.append("image")
        .attr('width', origW * scale)
        .attr('height', origH * scale)
        .attr('x', dx)
        .attr('y', dy)
        //.attr('preserveAspectRatio', "xMinYMin slice")
        .attr("xlink:href", imgUrl);

    var pathData = trayData.items[+tray_id].path;
    var svgPath = drawPath(svg, pathData, 'red');

    // transform the overlay to match the transformation of the image
    svgPath.attr('transform', ' translate(' + dx + ',' + dy + ') scale(' + scale + ')')

    // // draw BBOX
    // svg.append("rect")
    //     .attr("stroke", "white")
    //     .attr("stroke-width", "2px")
    //     .attr("fill", "none")
    //     .attr("x", bb.x)
    //     .attr("y", bb.y)
    //     .attr("width", bb.w)
    //     .attr("height", bb.h);

}


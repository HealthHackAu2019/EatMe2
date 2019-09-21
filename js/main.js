/**
 * Fetches the frame image and associated data from files in `/data`,
 * then plots the image in given `targetElement`,
 * scaling and translating so the tray fills the viewport
 * and draws overlay based on data from JSON.
 *
 * @param targetElement the HTML host element to draw SVG in.
 * @param trayIdx index number of the tray.
 */
function drawTrayWithOverlay(targetElement, trayIdx) {

    // svg size
    const svgW = 400;
    const svgH = 300;
    // orig pic size
    const origW = 1224;
    const origH = 946;

    var imgUrl = 'data/img/' + trayIdx + '.png';
    var trayData = window['tray_' + trayIdx];

    // bounding box of tray
    var bb = trayData.bbox;

    var svg = d3.select(targetElement)
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

    var pathData = trayData.items[+trayIdx].path;
    var svgPath = drawPath(svg, pathData, 'red');

    // transform the overlay to match the transformation of the image
    svgPath.attr('transform', ' translate(' + dx + ',' + dy + ') scale(' + scale + ')')

}


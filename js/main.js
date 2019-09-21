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

    let imgUrl = 'data/img/' + trayIdx + '.png';
    let trayData = window['tray_' + trayIdx];

    // bounding box of tray
    let bb = trayData.bbox;

    let svg = d3.select(targetElement)
        .append("svg")
        .style('border', 'black solid')
        .attr("width", svgW)
        .attr("height", svgH);

    // transform so tray fills the SVG
    let scale = Math.min(svgW / bb.w, svgH / bb.h); // TODO correct??
    let dx = -bb.x * scale;
    let dy = -bb.y * scale;

    svg.append("image")
        .attr('width', origW * scale)
        .attr('height', origH * scale)
        .attr('x', dx)
        .attr('y', dy)
        //.attr('preserveAspectRatio', "xMinYMin slice")
        .attr("xlink:href", imgUrl);

    let pathData = trayData.items[+trayIdx].path;
    let svgPath = drawPath(svg, pathData, 'red');

    // transform the overlay to match the transformation of the image
    let transform = 'translate(' + dx + ',' + dy + ') scale(' + scale + ')';
    console.log('Transform: ' + transform);
    svgPath.attr('transform', transform)

}

